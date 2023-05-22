import React, {useEffect, useState} from "react";
import "../Styles/AccountSettingsComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {baseURL} from "../misc/constants";
import {useNavigate} from "react-router-dom";

function AccountSettingsComponent(props){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() =>{
        setUserName(props.userName)
        setPassword(props.password)
        setRepeatedPassword(props.password)
    }, [props.userName, props.password])

    function handleChangeUserName(event){
        setUserName(event.target.value)
    }

    function handleChangePassword(event){
        setPassword(event.target.value)
    }

    function handleChangeRepeatedPassword(event){
        setRepeatedPassword(event.target.value)
    }

    async function handleUpdateAccountClick(event){
        if(password !== repeatedPassword){
            console.log("Passwords don't match");
            return;
        }
        var requestBody = {
            email: localStorage.getItem('userName'),
            new_email: userName,
            new_password: password
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
        await fetch(baseURL + 'api/UserUpdate', requestOptions)
            .then(response => {
                if(response.ok){
                    //Update local storage
                    localStorage.setItem('userName', userName)
                    localStorage.setItem('password', password)
                }
                return response.json()
            })
            .then(data =>{
                navigate("/AdministerLock", {
                    state:{
                        userName: userName,
                        password: password
                    }
                })
            })
    }
    return (
        <div id={"MainAccountSettingsComponentDiv"}>
            <center>
                <h2>
                    My Account
                </h2>
            </center>
            <div id={"CredentialsDiv"}>
                <center id={"CenterForCredentialsDiv"}>
                    <div>
                        <FontAwesomeIcon icon={faUser} id={"faUser"}/>
                        <input type={"text"} placeholder={"Username"} value={userName} onChange={(event) => handleChangeUserName(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"Password"} value={password} onChange={(event) => handleChangePassword(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"Repeat Password"} value={repeatedPassword} onChange={(event) => handleChangeRepeatedPassword(event)}/>
                    </div>
                </center>
            </div>

            <div id={"UpdateAccountButtonDiv"}>
                <center>
                    <button id={"UpdateAccountButton"} onClick={(event) => handleUpdateAccountClick(event)}>Update Account</button>
                </center>
            </div>

        </div>
    )
}

export default AccountSettingsComponent