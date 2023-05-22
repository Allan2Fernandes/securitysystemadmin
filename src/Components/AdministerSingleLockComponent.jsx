import React, {useEffect, useState} from "react";
import "../Styles/AdministerSingleLockComponent.css"
import {useNavigate} from "react-router-dom";

function AdministerSingleLockComponent(props){
    const [nameOfLock, setNameOfLock] = useState("One and lonely lock");
    const [lockID, setLockID] = useState(50);
    const [lockLocation, setLockLocation] = useState("Home");
    const [isShared, setIsShared] = useState(false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        setUserName(props.userName)
        setPassword(props.password)
    }, [props.userName, props.password])

    function navigateToLockPermissionsPage(){
        navigate("/AdministerLockPermissions", {
            state: {
                userName: userName,
                password: password
            }
        });
    }

    function HandleChangeLockName(event){
        setNameOfLock(event.target.value)
    }

    function handleChangeLockID(event){
        setLockID(event.target.value)
    }

    function handleChangeLockLocation(event){
        setLockLocation(event.target.value)
    }

    function UpdateDetailsHandler(){

    }

    return (
        <div id={"AdminSingleLockComponentMainDiv"}>
            <div id={"LockNameDiv"}>
                <label>Lock Name: </label>
                <br/>
                <input type={"text"} value={nameOfLock} onChange={(event) => HandleChangeLockName(event)}/>
            </div>
            <div id={"LockIDDiv"}>
                <label>Lock ID: </label>
                <br/>
                <input type={"number"} value={lockID} onChange={(event) => handleChangeLockID(event)}/>
            </div>

            <div id={"LockLocationDiv"}>
                <label>Lock Location: </label>
                <br/>
                <input type={"text"} value={lockLocation} onChange={(event) => handleChangeLockLocation(event)}/>
            </div>
            <div id={"LockIsSharedDiv"}>
                <label>Sharing status: </label>
                <br/>
                <p>
                    {isShared ? "Not sole access" : "Sole access"}
                </p>
            </div>
            <div id={"ButtonsDiv"}>
                <center>
                    <button id={"UpdateDetailsButton"} onClick={(event) => UpdateDetailsHandler(event)}>Update details</button>
                    <br/>
                    <button id={"ManagePermissionsButton"} onClick={navigateToLockPermissionsPage}>Manage permissions</button>
                </center>
            </div>
        </div>
    )
}

export default AdministerSingleLockComponent