import React from "react";
import "../Styles/LoginPage.css"
import "../Components/LoginComponent"
import LoginComponent from "../Components/LoginComponent";

function LoginPage(){
    return (
        <div id={"WholeLoginDiv"}>
            <LoginComponent/>
        </div>
    )
}

export default LoginPage