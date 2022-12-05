import React, { useState, useEffect } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Server from './Server.js';
import Sales from './Sales.js';
import Restock from './Restock.js';
import Excess from './Excess.js';
import Pair from './Pair.js';
import Inventory from './Inventory.js';
import CustomerSelect from './CustomerSelect.js';
import CustomerCheckout from './CustomerCheckout.js';
import EntreeMods from './EntreeMods.js';
import Menu from './Menu.js';
import {
    Routes,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddInventoryItem from './AddInventoryItem.js';
import EditInventoryItem from './EditInventoryItem.js';
import AddMenuItem from './AddMenuItem.js';
import EditMenuItem from './EditMenuItem.js';
import Divider from '@mui/material/Divider';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './css/App.css'; 

const clientId = '548414080736-sebecd81nkhcn439o0k1mudqlbt52qla.apps.googleusercontent.com';

function App() {

    const location = useLocation();
    const [ curPage, setCurPage ] = useState('');
    const [ user, setUsername ] = useState({});

    const changePageTitle = () => {
        if (location.pathname === '/') {
            setCurPage('Home');
        } else if (location.pathname === '/login') {
            setCurPage('Login');
        } else if (location.pathname === '/register') {
            setCurPage('Register');
        } else if (location.pathname === '/server') {
            setCurPage('Server');
        } else if (location.pathname === '/selection') {
            setCurPage('Select Meal');
        } else if (location.pathname === '/selection/entree') {
            setCurPage('Modify Entree');
        } else if (location.pathname === '/checkout') {
            setCurPage('Checkout');
        } else if (location.pathname === '/manager/sales') {
            setCurPage('Sales Report');
        } else if (location.pathname === '/manager/restock') {
            setCurPage('Restock Report');
        } else if (location.pathname === '/manager/excess') {
            setCurPage('Excess Report');
        } else if (location.pathname === '/manager/pair') {
            setCurPage('What Sales Together');
        } else if (location.pathname === '/manager/inventory') {
            setCurPage('Inventory');
        } else if (location.pathname === '/manager/menu') {
            setCurPage('Menu');
        }
    };

    function handleCallbackResponse(response){
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUsername(userObject);
    }

    function handleSignOut() {
        setUsername({});
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) !== undefined) {
            setUsername(JSON.parse(localStorage.getItem("user")));
        }
        console.log(user);
    }, []);

    useEffect(() => {
        // storing input name
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        changePageTitle()
    }, [location]);

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: '#3eda00' }} >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="home"
                            sx={{ mr: 2 }}
                        >
                            <Link
                                to={{
                                    pathname: '/'
                                }}
                            >
                                <HomeIcon />
                            </Link>
                        </IconButton>
                        <Link
                            to={{
                                pathname: '/server'
                            }}
                        >
                            <Button color='inherit' margin='normal' >
                                Servers
                            </Button>
                        </Link>
                        <Divider orientation="vertical" variant='middle' flexItem />
                        <Link
                            to={{
                                pathname: '/manager/sales'
                            }}
                        >
                            <Button color='inherit' margin='normal' >
                                Managers
                            </Button>
                        </Link>
                        <Typography className='page-title' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <label className='page-title-text' >{curPage}</label>
                        </Typography>
                        {user.name === undefined ? 
                            <GoogleLogin
                                onSuccess={handleCallbackResponse}
                                onError={() => {
                                console.log('Login Failed');
                                }}
                                useOneTap
                            /> : <label>{user.name}</label>
                        }
                        {user.name !== undefined ? 
                            <Button color='inherit' margin='normal' onClick= {handleSignOut} >
                                Sign Out
                            </Button> : null
                        }
                        

                        {/* <Link
                            to={{
                                pathname: '/login'
                            }}
                        >
                            <Button color="inherit">Login</Button>
                        </Link>
                        <Divider orientation="vertical" variant='middle' flexItem />
                        <Link
                            to={{
                                pathname: '/register'
                            }}
                        >
                            <Button color="inherit">Register</Button>
                        </Link> */}
                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Routes>
                    <Route path='/' element={<Home />} /> 
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/selection/entree" element={<EntreeMods />} />
                    <Route path="/selection" element={<CustomerSelect />} />
                    <Route path="/checkout" element={<CustomerCheckout />} />
                    <Route path="/server" element={<Server />} />
                    <Route path="/manager/sales" element={<Sales />} />
                    <Route path="/manager/restock" element={<Restock />} />
                    <Route path="/manager/excess" element={<Excess />} />
                    <Route path="/manager/pair" element={<Pair />} />
                    <Route path="/manager/inventory" element={<Inventory />} />
                    <Route path="/manager/inventory/add" element={<AddInventoryItem />} />
                    <Route path="/manager/inventory/edit" element={<EditInventoryItem />} /> 
                    <Route path="/manager/menu" element={<Menu />} />
                    <Route path="/manager/menu/add" element={<AddMenuItem />} />
                    <Route path="/manager/menu/edit" element={<EditMenuItem />} /> 
                </Routes>
            </div>
        </div>
    );
}


export default App;
