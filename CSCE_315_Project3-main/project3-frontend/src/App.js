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
import apiClient from './services/apiClient.js';
import './css/App.css'; 

const clientId = '548414080736-sebecd81nkhcn439o0k1mudqlbt52qla.apps.googleusercontent.com';

function App() {

    const api = apiClient;
    const location = useLocation();
    const [ curPage, setCurPage ] = useState('');
    const [ user, setUsername ] = useState({});
    const [ userType, setUserType ] = useState('');

    const changePageTitle = () => {
        if (location.pathname === '/') {
            setCurPage('');
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
        setUsername(userObject);
        console.log(user);
    }

    function handleSignOut() {
        setUsername({});
        setUserType('');
    }

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
    }

    const checkUserPermissions = async () => {
        const { data, error } = await api.getUserClass(user.email);
        setUserType(data[0].type);
        console.log(data[0].type);
    };

    useEffect(() => {
        if (JSON.stringify(JSON.parse(localStorage.getItem("user"))) !== '{}') {
            setUsername(JSON.parse(localStorage.getItem("user")));
            console.log(user);
        }
    }, []);

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    useEffect(() => {
        // storing input name
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        changePageTitle()
    }, [location]);

    useEffect(() => {
        checkUserPermissions();
    }, [user]);

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: '#515151' }} >
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
                        {(userType === 'server' || userType === 'manager') ? 
                            <Link
                                to={{
                                    pathname: '/server'
                                }}
                            >
                                <Button color='inherit' margin='normal' >
                                    Servers
                                </Button>
                            </Link> : null
                        }
                        <Divider orientation="vertical" variant='middle' flexItem />
                        {(userType === 'manager') ? 
                            <Link
                                to={{
                                    pathname: '/manager/sales'
                                }}
                            >
                                <Button color='inherit' margin='normal' >
                                    Managers
                                </Button>
                            </Link> : null
                        }
                        <Typography className='page-title' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <label className='page-title-text' >{curPage}</label>
                        </Typography>
                        <div id="google_translate_element"></div>
                        {user.name === undefined ? 
                            <GoogleLogin
                                onSuccess={handleCallbackResponse}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            /> : null
                        }
                        {user.name !== undefined ? 
                            <div>
                                <label>{user.name}</label>
                                <Button color='inherit' margin='normal' onClick= {handleSignOut} >
                                    Sign Out
                                </Button>
                            </div> : null
                        }
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
