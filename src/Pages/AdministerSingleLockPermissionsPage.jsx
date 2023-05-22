import React, {useEffect, useState} from "react";
import UniversalTopBar from "../Components/UniversalTopBar";
import AdministerSingleLockPermissionsComponent from "../Components/AdministerSingleLockPermissionsComponent";
import "../Styles/AdministerSingleLockPermissionsPage.css"
import {useLocation} from "react-router-dom";

function AdministerSingleLockPermissionsPage(){
    const location = useLocation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() =>{
        setUserName(location.state?.userName)
        setPassword(location.state?.password)
    },[location.state?.userName, location.state?.password])
    return (
        <div id={"MainDiv"}>
            <UniversalTopBar userName={userName} password={password}/>
            <AdministerSingleLockPermissionsComponent/>
        </div>
    )
}

export default AdministerSingleLockPermissionsPage