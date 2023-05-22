import React, {useEffect, useState} from "react";
import UniversalTopBar from "../Components/UniversalTopBar";
import AdministerSingleLockComponent from "../Components/AdministerSingleLockComponent";
import "../Styles/AdministerSingleLockPage.css"
import {useLocation} from "react-router-dom";

function AdministerSingleLockPage(){
    const location = useLocation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() =>{
        setUserName(location.state?.userName)
        setPassword(location.state?.password)
    },[])
    return (
        <div id={"MainDiv"}>
            <UniversalTopBar userName={userName} password={password}/>
            <AdministerSingleLockComponent userName={userName} password={password}/>
        </div>
    )
}

export default AdministerSingleLockPage