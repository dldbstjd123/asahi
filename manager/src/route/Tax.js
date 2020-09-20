import React, {useState, useEffect}from 'react';
import { domain } from "../config";

const Tax = ()=>{
    const [tax, setTax] = useState(0)

    useEffect(()=>{
        fetch(`${domain}admin/tax/get`, {
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
              setTax(data.rate);
            });
    },[])
    return(
        <div>
            Tax Page
            current tax = {tax}
        </div>
    )
}

export default Tax;
