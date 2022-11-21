import React, { useState } from 'react';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './css/Login.css';


const Login = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitData = () => {
        console.log(username, password);
    };

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
            <TextField id='username-entry' label='Enter Username' variant='outlined' margin='normal' onChange={changeUsername} />
            <TextField id='password-entry' label='Enter Password' variant='outlined' margin='normal' onChange={changePassword} />
            <Button variant='outlined' margin='normal' onClick={submitData} >Submit</Button>
        </div>
    );
}

export default Login;