import React, {useState} from "react";
import "../Styles/RegisterComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import "../misc/constants"
import {baseURL} from "../misc/constants";
import {useNavigate} from "react-router-dom";

function RegisterComponent(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [showPasswordsError, setShowPasswordsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const passwordsDontMatchError = "Passwords Don't match";
    const userNameTakenErrorMessage = "Pick another Username. This one is taken";
    const navigate = useNavigate();


    function handleChangeUserName(event){
        setUserName(event.target.value);
    }
    function handleChangePassword(event){
        setPassword(event.target.value);
    }
    function handleChangeRepeatedPassword(event){
        setRepeatedPassword(event.target.value);
    }
    async function handleCreateAccountClick(){
        if(password !== repeatedPassword){
            setShowPasswordsError(true)
            setErrorMessage(passwordsDontMatchError)
            return;
        }else{
            setShowPasswordsError(false);
            //Post the user create api
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
            await fetch(baseURL + 'api/UserCreate', requestOptions)
                .then(response => {
                    if(response.ok){
                        navigate("/")
                    }
                    return response.json();
                });
        }
    }

    return (
        <div id={"RegisterComponentMainDiv"}>
            <center id={"CenterForIconDiv"}>
                <div id={"CircularDivUserPlusIcon"}>
                    <FontAwesomeIcon icon={faUserPlus} id={"faUserPlusIcon"}/>
                </div>
            </center>

            <div id={"CredentialsDiv"}>
                <center id={"CenterForCredentialsDiv"}>
                    <div>
                        <FontAwesomeIcon icon={faUser} id={"faUser"}/>
                        <input type={"text"} placeholder={"Username"} onChange={(event) => handleChangeUserName(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"Password"} onChange={(event) => handleChangePassword(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"Repeat Password"} onChange={(event) => handleChangeRepeatedPassword(event)}/>
                    </div>
                </center>
            </div>

            <div id={"CreateAccountButtonDiv"}>
                <center>
                    <button id={"CreateAccountButton"} onClick={(event) => handleCreateAccountClick(event)}>Create Account</button>
                </center>
            </div>

            <div id={"InvalidCredsDivRegisterComponent"}>
                {
                    showPasswordsError?<label id={"InvalidCredsLabel"}>{errorMessage}</label>:null
                }
            </div>
        </div>
    )
}

export default RegisterComponent