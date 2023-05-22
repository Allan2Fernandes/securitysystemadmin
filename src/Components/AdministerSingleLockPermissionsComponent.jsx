import React, {useEffect, useState} from "react";
import "../Styles/AdministerSingleLockPermissionsComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

function AdministerSingleLockPermissionsComponent(){
    const [lockName, setLockName] = useState("Home lock");
    const [listOfPermissions, setListOfPermissions] = useState([]);

    useEffect(() =>{
        var mockPermissions = [
            {
                name:"Allan",
                type:"Admin"
            },
            {
                name:"Esben",
                type:"Guest"
            },
            {
                name:"Nikolai",
                type:"Guest"
            },
            {
                name:"Chris",
                type:"Guest"
            }
        ]
        setListOfPermissions(mockPermissions)
    }, [])

    function grantPermissionsClickHandler(){
        var permissions = [...listOfPermissions]
        permissions.push({
            name:"Added",
            type:"Guest"
        })
        setListOfPermissions(permissions)
    }

    return (
        <div id={"MainComponentDiv"}>
            <center>
                <h2>
                    Manage Lock Permissions
                </h2>
            </center>
            <button id={"GrantPermissionButton"} onClick={grantPermissionsClickHandler}>
                <FontAwesomeIcon icon={faAdd}/>
                <label>Grant Permission</label>
            </button>
            <div id={"ListOfPermissionsDiv"}>
                <div>

                    <table id={"PermissionsTable"}>
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Access</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfPermissions.map((row, index) => (
                            <tr key={index} className={index%2===0?"EvenRow":"OddRow"}>
                                <td>{row.name}</td>
                                <td>{row.type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdministerSingleLockPermissionsComponent