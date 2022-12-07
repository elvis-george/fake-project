import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './css/CustomerCheckout.css';
import apiClient from './services/apiClient.js';

const CustomerCheckout = () => {

    const api = apiClient;
    let inventory = null;

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state;

    const [ customerName, setCustomerName ] = useState("");
    const baseIds = ["Grain Bowl", "Salad", "Pita", "Greens and Grains"];
    const proteinIds = ["Gyro", "Falafel", "Vegetable Medley", "Meatballs", "Chicken"];
    const starterIds = ["2 Falafels", "Hummus and Pita", "Vegan Box", "Garlic Fries"];
    const [ cartItems, setCartItems ] = useState(null);
    const [ cartItemsPage, setCartItemsPage ] = useState(1);
    const [ orderSuccess, setOrderSuccess ] = useState(null);

    const addOrder = async orders => { //orders is an array of objects
        const { data, error } = await api.addOrder(orders); //data is an array of objects
        if (error === null) { //if there is no error
            setOrderSuccess(true);
        } else { //if there is an error
            setOrderSuccess(false);
        }
        await console.log(data, error); //data is an array of objects
    };

    const changeCustomerName = (e) => { //e is an event object
        setCustomerName(e.target.value);
    };

    const changeCartItemsPage = (e) => { //e is an event object
        setCartItemsPage(parseInt(e.target.innerHTML[0]));
    };

    const showCartItems = () => { //this function returns an array of JSX elements
        const starters = from.starters; //starters is an array of objects
        const bases = from.bases;    //bases is an array of objects
        let cartItemsArr = [...starters, ...bases]; //cartItemsArr is an array of objects
        let items = null; //items is an array of JSX elements
        let arrayOfArrays = []; //arrayOfArrays is an array of arrays
        let cartItemsPages = []; //cartItemsPages is an array of JSX elements
        for (let i = 0; i < cartItemsArr.length; i += 2) { //for each item in cartItemsArr
            arrayOfArrays.push(cartItemsArr.slice(i, i + 2)); //push a subarray of cartItemsArr to arrayOfArrays
        }

        cartItemsPages = arrayOfArrays; //cartItemsPages is an array of arrays
        console.log(cartItemsPages) //cartItemsPages is an array of arrays

        if (cartItemsPages.length > 0) { //if there are items in the cart
            items = (cartItemsPages[cartItemsPage - 1].map((item) => { //items is an array of JSX elements
                if (item.base === undefined) { //if the item is a starter
                    return (<Card
                        sx = {{ 
                            width: 300,
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5,
                            backgroundColor: '#F5FFFA'
                        }}    
                    >
                        <label>{item}</label>
                    </Card>);
                } else { //if the item is a base
                    return (<Card
                        sx = {{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 180,
                            marginTop: 5,
                            backgroundColor: '#F5FFFA'
                        }}    
                    >
                        <label>Base: {item.base}</label>
                        <label>Protein: {item.protein}</label>
                        {item.toppings !== '' ?
                            <label>Toppings: {item.toppings}</label> : <label>Toppings: None</label>
                        }
                        {item.dressings !== '' ?
                            <label>Dressings: {item.dressings}</label> : <label>Dressings: None</label>
                        }
                    </Card>);
                }
            }));
        }

        setCartItems( //set cartItems to an array of JSX elements
            <div className='cart-items' >
                {items}
                {(cartItemsPages.length === 0) ? null : 
                    <div className='checkout-items-pagination' >
                        <Pagination hidePrevButton={true} hideNextButton={true} count={cartItemsPages.length} page={cartItemsPage} 
                            onChange={changeCartItemsPage} color="primary" />
                    </div>
                }
            </div>
        );
    };

    const submitData = () => { //this function returns an array of objects
        let orders = null;
        let orderItems = [];

        console.log(from.combo);
        let wasComboSet = false;

        from.cartItems.map((item) => { //for each item in cartItems
            (item.base === undefined) ? 
                orderItems.push({ //push an object to orderItems
                    "isCombo"   : (from.combo && !wasComboSet) ? true : false,
                    "starterId" : String(starterIds.indexOf(
                        (item === 'Falafels') ?
                            '2 Falafels' : item
                    ) + 1),
                    "baseId"    : "",
                    "proteinId" : ""
                }) : 
                orderItems.push({ //push an object to orderItems
                    "isCombo"   : (from.combo && !wasComboSet) ? true : false,
                    "starterId" : '',
                    "baseId"    : String(baseIds.indexOf(item.base) + 1),
                    "proteinId" : String(proteinIds.indexOf(item.protein) + 1)
                });
                wasComboSet = true;
        });

        orders = { //orders is an object
            "employeeId": "1",
            "items": orderItems
        }
        console.log(orders);
        addOrder(orders);
    };

    useEffect(() => { //this function runs when the component mounts
        if (from.cartItems !== 'undefined') {
            showCartItems();
        }
    }, [location.state, cartItemsPage]);

    useEffect(() => { //this function runs when the component mounts
        if (orderSuccess !== null) {
            setTimeout(function () {
                navigate('/');
            }, 2000);
        }
    }, [orderSuccess]);

    return (
        <div className='customer-checkout' >
            <div className='checkout-area' >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 570,
                        height: 650,
                        backgroundColor: '#FFFAF0'
                    }}
                >
                    <label className='checkout-area-title' >Review Checkout</label>
                    {cartItems}
                    {from.combo === true ?
                        <label>+ Combo</label> : null
                    }
                    <label className='checkout-area-total' >Total: ${from.cost.toFixed(2)}</label>
                </Card>
            </div>
            <div className='not-checkout-area' >
                <div className='customer-name-entry-box' >
                    <TextField id='customer-name-entry' label='Enter Name' variant='outlined' margin='normal' onChange={changeCustomerName} />
                </div>
                <div className='checkout-button' >
                    <Button variant='outlined' margin='normal' onClick={submitData} >Pay</Button>
                </div>
                {(orderSuccess !== null) ? ((orderSuccess === true) ? 
                    <div className='submit-alert' >
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Order Successful!
                        </Alert>
                    </div> :
                    <div className='submit-alert' >
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Order Failed
                        </Alert>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CustomerCheckout;