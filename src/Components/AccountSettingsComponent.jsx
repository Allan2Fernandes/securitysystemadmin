import React, {useEffect, useState} from "react";
import "../Styles/AccountSettingsComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {baseURL} from "../misc/constants";
import {useNavigate} from "react-router-dom";

function AccountSettingsComponent(props){
    const [userName, setUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
    const [profilePictureExists, setProfilePictureExists] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        //Get user details on session token
        var requestBody = {
            token: localStorage.getItem('sessionToken')
        }
        console.log(requestBody['token'])
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }

        fetch(baseURL + 'api/UserGetInfo', requestOptions)
            .then(request => request.json())
            .then(data => {
                console.log(data)
                setUserName(data['email']);
                //If the image does exist
                if(data['image'] !== undefined){
                    props.updateB64Image(data['image']);
                    setProfilePictureExists(true);
                }
            })
    }, [localStorage])


    function handleChangeUserName(event){
        setUserName(event.target.value)
    }

    function handleChangeCurrentPassword(event){
        setCurrentPassword(event.target.value)
    }

    function handleChangeNewPassword(event){
        setNewPassword(event.target.value)
    }

    function handleChangeNewRepeatedPassword(event){
        setNewRepeatedPassword(event.target.value)
    }

    async function handleUpdateAccountClick(event){
        if(currentPassword !== localStorage.getItem('password')){
            console.log("Current password is incorrect");
            return;
        }

        if(newPassword !== newRepeatedPassword){
            console.log("Passwords don't match");
            return;
        }
        var requestBody;
        if(profilePictureExists){
            requestBody = {
                email: localStorage.getItem('userName'),
                new_email: userName,
                new_password: newPassword,
                new_image_data: props.b64Image
            }
        }else {
            requestBody = {
                email: localStorage.getItem('userName'),
                new_email: userName,
                new_password: newPassword
            }
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
                    localStorage.setItem('password', newPassword)
                }
                return response.json()
            })
            .then(data =>{
                navigate("/AdministerLock")
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
                        <input type={"password"} placeholder={"Current Password"} value={currentPassword} onChange={(event) => handleChangeCurrentPassword(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"New Password"} value={newPassword} onChange={(event) => handleChangeNewPassword(event)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLock} id={"faUser"}/>
                        <input type={"password"} placeholder={"Repeat Password"} value={newRepeatedPassword} onChange={(event) => handleChangeNewRepeatedPassword(event)}/>
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