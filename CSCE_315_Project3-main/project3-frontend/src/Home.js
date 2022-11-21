import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './css/Home.css';

const Home = () => {

    return (
        <div className='home' >
            <div className='home-main' >
                <h1 className='home-label' >Welcome to Pom and Honey!</h1>
                <p className='home-text' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className='order-button' >
                    <Link
                        to={{
                            pathname: '/selection'
                        }}
                    >
                        <Button variant='outlined' margin='normal' >
                            Order!
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    ); 
};

export default Home;