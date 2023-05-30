import React, {useState} from "react";
import "../Styles/UniversalTopBar.css"
import {faCog, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../misc/constants";
function UniversalTopBar(props){
    const [showDropDown, setShowDropDown] = useState(false)
    const navigate = useNavigate();

    function handleClickHomeIcon(){
        navigate("/AdministerLock")
    }

    function handleClickCogIcon(){
        console.log("Activating settings")
    }

    function handleClickUserIcon(){
        setShowDropDown(!showDropDown);
    }

    function AccountSettingsClickHandler(){
        navigate("/AccountSettings")
    }

    async function signOutClickHandler(event){
        var shouldNavigateToLogin = false
        var requestBody = {
            token: localStorage.getItem('sessionToken')
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
        await fetch(baseURL + 'api/UserLogout', requestOptions)
            .then(response => {
                if(response.ok){
                    shouldNavigateToLogin = true;
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
            });
        if(shouldNavigateToLogin){
            navigate("/")
        }
    }

    return (
        <div id={"WholeTopBarDiv"}>
            <div id={"LogoDiv"} onClick={handleClickHomeIcon}>
                <FontAwesomeIcon icon={faHome} id={"HomeIcon"}/>
            </div>
            <div id={"SettingsDiv"} onClick={handleClickCogIcon}>
                <FontAwesomeIcon icon={faCog} id={"CogIcon"}/>
            </div>
            <div id={"AccountsDiv"} onClick={handleClickUserIcon}>
                <FontAwesomeIcon icon={faUser} id={"UserIcon"}/>
            </div>
            <center>
                {
                    showDropDown && <div id={"DropDownMenu"}>
                        <div id={"AccountSettingsDiv"} onClick={(event) => AccountSettingsClickHandler()}>Account settings</div>
                        <div id={"SignOutDiv"} onClick={(event) => signOutClickHandler(event)}>Sign out</div>
                    </div>
                }
            </center>
        </div>
    )
}

export default UniversalTopBar