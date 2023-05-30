import React, {useEffect, useState} from "react";
import "../Styles/LockSelectorComponent.css"

function LockSelectorComponent(props){
    const [listOfLocks, setListOfLocks] = useState([])

    useEffect(()=>{
        setListOfLocks(props.listOfLocks)
    }, [props.listOfLocks])

    function setSelectedIndex(index){
        props.setSelectedIndex(index)
    }

    return (
        <div id={"MainLockSelectorDiv"}>
            {
                listOfLocks.map((element, index)=>(
                    <div key={index} onClick={() => setSelectedIndex(index)}>{element.nameOfLock}</div>
                ))
            }
        </div>
    )
}

export default LockSelectorComponent