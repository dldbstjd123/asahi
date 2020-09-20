import React, {useState, useEffect}from 'react';
import { domain } from "../config";

const Tax = ()=>{
    const [tax, setTax] = useState(0)

    function onAmountChange(e) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
          setTax(amount)
        }
      };

    function changeTax(){
        fetch(`${domain}admin/tax/update`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tax})
        }).then(res => res.json())
        .then(data => {
            if(data.status === 1){
                console.log('succeed changing tax')
            }
        })
    }

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
            <input type='text' onChange={onAmountChange}/>
            <input type='button' value="Change" onClick={changeTax} />
        </div>
    )
}

export default Tax;
