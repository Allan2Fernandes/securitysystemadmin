import React, {useEffect, useState} from "react";
import UniversalTopBar from "../Components/UniversalTopBar";
import "../Styles/AccountSettingsPage.css"
import AccountSettingsComponent from "../Components/AccountSettingsComponent";
import {useLocation} from "react-router-dom";

function AccountSettingsPage(){
    const location = useLocation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() =>{
        setUserName(location.state?.userName)
        setPassword(location.state?.password)
    }, [])
    return (
        <div id={"MainDiv"}>
            <UniversalTopBar/>
            <AccountSettingsComponent userName={userName} password={password}/>
        </div>
    )
}

export default AccountSettingsPage