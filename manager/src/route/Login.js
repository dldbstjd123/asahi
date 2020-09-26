import React from "react"
import { useHistory } from "react-router-dom"
import "../css/Login.css"
import { domain } from "../config"
//import {webSiteURL} from '../../../ignore/config.js';

const Login = props => {
    const history = useHistory()

    async function validateForm() {
        let username = document.getElementById("accountId").value
        let password = document.getElementById("password").value

        try {
            let fetchData = await fetch(`${domain}admin/login`, {
                method: "POST",
                //mode: 'cors',
                mode: "same-origin",
                cache: "no-cache",
                credentials: "same-origin",
                //credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }).then(res => res.json())
            if (fetchData.status == "succeed") {
                history.push("/admin/home")
            }
        } catch (err) {
            throw err
        }
    }
    function enterPressed(event) {
        var code = event.keyCode || event.which
        if (code === 13) {
            //13 is the enter keycode
            validateForm()
        }
    }
    return (
        <div id="loginContainer">
            <div>Asahi Admin Login</div>
            <form name="loginForm">
                <label>USERNAME</label>
                <input
                    type="text"
                    id="accountId"
                    name="accountId"
                    required
                    onFocus={() => console.log("clicked")}
                    onBlur={() => console.log("out")}
                    onKeyPress={enterPressed}
                />
                <label>PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onFocus={() => console.log("clicked")}
                    onBlur={() => console.log("out")}
                    onKeyPress={enterPressed}
                />
                <input
                    type="button"
                    value="Login"
                    onClick={() => validateForm()}
                />
            </form>
        </div>
    )
}

export default Login
