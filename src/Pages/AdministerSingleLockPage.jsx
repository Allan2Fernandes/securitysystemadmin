import React, {useEffect, useState} from "react";
import UniversalTopBar from "../Components/UniversalTopBar";
import AdministerSingleLockComponent from "../Components/AdministerSingleLockComponent";
import "../Styles/AdministerSingleLockPage.css"
import {useLocation} from "react-router-dom";
import LockSelectorComponent from "../Components/LockSelectorComponent";

function AdministerSingleLockPage(){
    const location = useLocation();
    const [listOfLocks, setListOfLocks] = useState([{
        nameOfLock: "One and lonely lock",
        lockID: 10,
        lockLocation: "Window",
        isShared: false
    },
        {
            nameOfLock: "lock 2",
            lockID: 10,
            lockLocation: "Window",
            isShared: false
        },
        {
            nameOfLock: "lcok3",
            lockID: 260,
            lockLocation: "Window",
            isShared: false
        }
    ]);
    const [selectedLockIndex, setSelectedLockIndex] = useState(2)



    function setSelectedIndex(index){
        setSelectedLockIndex(index)
    }

    return (
        <div id={"MainDiv"}>
            <UniversalTopBar/>
            <AdministerSingleLockComponent
                nameOfLock={listOfLocks[selectedLockIndex].nameOfLock}
                lockID={listOfLocks[selectedLockIndex].lockID}
                lockLocation={listOfLocks[selectedLockIndex].lockLocation}
                isShared={listOfLocks[selectedLockIndex].isShared}
            />
            <LockSelectorComponent listOfLocks={listOfLocks} setSelectedIndex={setSelectedIndex}/>
        </div>
    )
}

export default AdministerSingleLockPage