import React, { useState } from 'react';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import './css/Register.css';

const Register = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const changeLastName = (e) => {
        setLastName(e.target.value);
    };

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitData = () => {
        console.log(firstName, lastName, username, password);
    };

    return (
        <div className='register' >
            <label className='register-label' >Employee Register</label>
            <div className='name-input' >
                <div className='first-name-div' >
                    <TextField id='first-name-entry' label='First Name' variant='outlined' margin='normal' onChange={changeFirstName} />
                </div>
                <div className='last-name-div' >
                    <TextField id='last-name-entry' label='Last Name' variant='outlined' margin='normal' onChange={changeLastName} />
                </div>
            </div>
            <TextField id='username-entry' label='Username' variant='outlined' margin='normal' onChange={changeUsername} />
            <TextField id='password-entry' label='Password' variant='outlined' margin='normal' onChange={changePassword} />
            <Button variant='outlined' margin='normal' onClick={submitData} >Submit</Button>
        </div>
    );
};

export default Register;