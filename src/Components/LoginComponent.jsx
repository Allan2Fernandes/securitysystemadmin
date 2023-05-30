import React, {useEffect, useState} from "react";
import "../Styles/LoginComponent.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {baseURL} from "../misc/constants";
import {useNavigate} from "react-router-dom";

function LoginComponent(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showInvalidDetailsError, setShowInvalidDetailsError] = useState(false);
    const [validDetailsReturned, setValidDetailsReturned] = useState(false);
    const navigate = useNavigate();

    function handlUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    async function handleLogin(){
        //Post with username and password
        //If the response is expected, navigate to the next page
        //If the details are rejected,
        var requestBody = {
            email: userName,
            password: password
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        await fetch(baseURL + 'api/UserLogin', requestOptions)
            .then(response => {
                console.log(response.ok)
                if(!response.ok){
                    setShowInvalidDetailsError(true);
                    setValidDetailsReturned(false);
                }else{
                    //navigate away
                    setShowInvalidDetailsError(false);
                    setValidDetailsReturned(true);
                    //navigate("/AdministerLock")
                }
                return response.json();
            })
            .then(data =>{
                setValidDetailsReturned(prevValidDetailsReturned => {
                    if (prevValidDetailsReturned) {
                        //data is token
                        localStorage.setItem('sessionToken', data);
                        localStorage.setItem('userName', userName);
                        localStorage.setItem('password', password);
                        navigate("/AdministerLock");
                    }
                    return prevValidDetailsReturned;
                });
            })


    }

    return (
        <div id={"LoginComponentMainDiv"}>
            <center id={"CenterForIconDiv"}>
                <div id={"CircularDivLockIcon"}>
                    <FontAwesomeIcon icon={faUnlock} id={"faIcon"}/>
                </div>
            </center>

            <div id={"CredentialsDivLogIn"}>
                <center id={"CenterForCredentialsDiv"}>
                    <div>
                        <FontAwesomeIcon icon={faUser} id={"faUser"}/>
                        <input type={"text"}
                               placeholder={"Username"}
                               onChange={(event) => handlUsernameChange(event)}
                               onKeyUp={(event) => {
                                   if(event.key === 'Enter'){
                                       handleLogin()
                                   }
                                }}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"}
                               placeholder={"Password"}
                               onChange={(event) => handlePasswordChange(event)}
                               onKeyUp={(event)=>{
                                   if(event.key === 'Enter'){
                                       handleLogin()
                                   }
                               }}/>
                    </div>
                </center>
            </div>

            <div id={"LoginButtonDiv"}>
                <center>
                    <button id={"LoginButton"} onClick={() => handleLogin()}>Login</button>
                    <br/>
                    <label id={"RegisterPageNavigationLabel"}>Don't have an account? <a href={"/Register"}>Create one</a></label>

                </center>
            </div>
            <div id={"InvalidCredsDiv"}>
                {
                    showInvalidDetailsError?<label id={"InvalidCredsLabel"}>Invalid username of password entered. Please try again</label>:null
                }
            </div>
        </div>
    )
}

export default LoginComponent