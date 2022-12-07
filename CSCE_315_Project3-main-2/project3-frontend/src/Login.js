import React, { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './css/Login.css';
import jwt_decode from "jwt-decode"


const Login = () => {

    const [ user, setUsername ] = useState({});
    const [ password, setPassword ] = useState({});

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitData = () => {
        console.log(user, password);
    };

    function handleCallbackResponse(response){
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUsername(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event) {
        setUsername({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "409010389560-6ic51no3tg97tifftt668ckhp3q8f9k7.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, []);

    return (
        <div className='login' >
            <label className='login-title' >Login</label>
            <Box
                className="login-img"
                component="img"
                sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                alt=""
                src="http://loremflickr.com/300/200"
            />
            {/* <TextField id='username-entry' label='Enter Username' variant='outlined' margin='normal' onChange={changeUsername} /> */}
            {/* <TextField id='password-entry' label='Enter Password' variant='outlined' margin='normal' onChange={changePassword} /> */}
            {/* <Button variant='outlined' margin='normal' onClick={submitData} >Submit</Button> */}
            <div id="signInDiv"></div>
            { Object.keys(user).length != 0 && 
                <button onClick= { (e) => handleSignOut(e)}>Sign Out</button>
            }
            { user && 
                <div>
                    {/* <img src={user.picture}></img> */}
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    );
}

export default Login;