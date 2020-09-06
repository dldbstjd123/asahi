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
            {list.map((item)=>{
                let source = `${domain}client/image?image=${item.image}`
                return(
                    <div key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                        <div>{item.price}</div>
                        <div><img src={source} style={{width:'200px', height:'200px'}}/></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu;