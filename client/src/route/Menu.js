import React, {useState, useEffect} from 'react';
import {domain} from '../config';

const Menu = (props)=>{
    const [list, setList] = useState([])

    useEffect(()=>{
        fetch(`${domain}client/menu/get`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setList(data);
            });
    },[])
    return(
        <div className='bodyContainer'>
            {list}
        </div>
    )
}

export default Menu;