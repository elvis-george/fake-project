import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import './css/CustomerCheckout.css';
import apiClient from './services/apiClient.js';

const CustomerCheckout = () => {

    const api = apiClient;
    let inventory = null;

    const location = useLocation();
    const from = location.state;

    console.log(from);

    const [ customerName, setCustomerName ] = useState("");
    const baseIds = ["Grain Bowl", "Salad", "Pita", "Greens and Grains"];
    const proteinIds = ["Gyro", "Falafel", "Vegetable Medley", "Meatballs", "Chicken"];
    const starterIds = ["2 Falafels", "Hummus and Pita", "Vegan Box", "Garlic Fries"];

    const addOrder = async orders => {
        const { data, error } = await api.addOrder(orders);
        await console.log(data);
    };

    const changeCustomerName = (e) => {
        setCustomerName(e.target.value);
    };

    const submitData = () => {
        let orders = null;
        if (from.entree.base !== '' && from.starter === '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : String(from.entree.combo),
                        "starterId" : '',
                        "baseId"    : String(baseIds.indexOf(from.entree.base) + 1),
                        "proteinId" : String(proteinIds.indexOf(from.entree.protein) + 1)
                    },
                ]
            };
        } else if (from.entree.base === '' && from.starter !== '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : "",
                        "starterId" : String(starterIds.indexOf(from.starter) + 1),
                        "baseId"    : "",
                        "proteinId" : ""
                    },
                ]
            };
        } else if (from.entree.base !== '' && from.starter !== '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : String(from.entree.combo),
                        "starterId" : '',
                        "baseId"    : String(baseIds.indexOf(from.entree.base) + 1),
                        "proteinId" : String(proteinIds.indexOf(from.entree.protein) + 1)
                    },
                    {
                        "isCombo"   : "",
                        "starterId" : String(starterIds.indexOf(from.starter) + 1),
                        "baseId"    : "",
                        "proteinId" : ""
                    },
                ]
            };
        }
        console.log(orders);
        addOrder(orders);
    };

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
                    {from.starter !== '' ?
                        <Card
                            sx = {{
                                width: 300,
                                height: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                                marginLeft: 16,
                                backgroundColor: '#F5FFFA'
                            }}    
                        >
                            <label>{from.starter}</label>
                        </Card> : null
                    }
                    {from.entree.base !== '' ? 
                        <Card
                            sx = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 300,
                                height: 250,
                                marginTop: 5,
                                marginLeft: 16,
                                backgroundColor: '#F5FFFA'
                            }}    
                        >
                            <label>Base: {from.entree.base}</label>
                            <label>Protein: {from.entree.protein}</label>
                            {from.entree.toppings !== '' ?
                                <label>Toppings: {from.entree.toppings}</label> : <label>Toppings: None</label>
                            }
                            {from.entree.dressings !== '' ?
                                <label>Dressings: {from.entree.dressings}</label> : <label>Dressings: None</label>
                            }

                        </Card> : null
                    }
                    {from.entree.combo === true ?
                        <label>+ Combo</label> : null
                    }
                    <label className='checkout-area-total' >Total: {from.cost}</label>
                </Card>
            </div>
            <div className='not-checkout-area' >
                <div className='customer-name-entry-box' >
                    <TextField id='customer-name-entry' label='Enter Name' variant='outlined' margin='normal' onChange={changeCustomerName} />
                </div>
                <div className='checkout-button' >
                    <Button variant='outlined' margin='normal' onClick={submitData} >Pay</Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerCheckout;