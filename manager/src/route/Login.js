import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Login.css';
import {domain} from '../config';
//import {webSiteURL} from '../../../ignore/config.js';

const Login = (props)=>{
    const history = useHistory();

    async function validateForm(){
        let username = document.getElementById('accountId').value
        let password = document.getElementById('password').value
        
        try{
            
            let fetchData = await fetch(`${domain}admin/login`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                'Content-Type':'application/json'
                },
                body: JSON.stringify({username,password})
            })
            .then(res => res.json())
            console.log(fetchData)
            if(fetchData.status == 'succeed'){
                history.push('/admin/home')
            } 
            
        }catch(err){throw err}
	
    }
    return(
        <div id='loginContainer'>
            <div>Asahi Admin Login</div>
	    <form name="loginForm" >
            <label>USERNAME</label>
            <input type="text" id="accountId" name="accountId" required onFocus={() =>console.log('clicked')} onBlur={() => console.log('out')} />
            <label>PASSWORD</label>
            <input type="password" id="password" name="password" required onFocus={() =>console.log('clicked')} onBlur={() => console.log('out')} />
            <input type="button" value="Login" onClick={()=> validateForm()}/>
	    </form>    
        </div>
    )
}

export default Login;
