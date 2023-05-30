import React, {useEffect, useState} from "react";
import UniversalTopBar from "../Components/UniversalTopBar";
import "../Styles/AccountSettingsPage.css"
import AccountSettingsComponent from "../Components/AccountSettingsComponent";
import missingProfilePicture from "../Images/missingProfilePicture.png"
import {useLocation} from "react-router-dom";

function AccountSettingsPage(){
    const [b64Image, setB64Image] = useState(missingProfilePicture);

    function updateB64Image(encodedImage){
        setB64Image(encodedImage);
        console.log(encodedImage)
    }


    return (
        <div id={"MainDiv"}>
            <img id={"ProfileImage"} src={b64Image} alt={"Profile image"}/>
            <UniversalTopBar/>
            <AccountSettingsComponent updateB64Image={updateB64Image} b64Image={b64Image}/>
        </div>
    )
}

export default AccountSettingsPage