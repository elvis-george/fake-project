import React, { useState } from 'react';
import TextField from '@mui/material/Textfield';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import apiClient from './services/apiClient';
import './css/AddInventoryItem.css';

/**
 * This function allows the user to add an item to the Inventory
 * It uses an API client to connect the frontend to the backend.
 * @returns a table with the updated inventory on the frontend
 * @public
 */
const AddInventoryItem = () => { // add invertory item

    const api = apiClient; // apiClient is a singleton

    const [ name, setName ] = useState('');
    const [ quantity, setQuantity ] = useState(0);

    const createInventoryItem = async () => {
        const item = {
            ingredient_name: name,
            quantity: parseInt(quantity)
        };
        console.log(item);
        const { data, error } = await api.createInventoryItem(item);
    };

    const changeItemName = (e) => { // change item name
        setName(e.target.value); // set name
    };

    const changeItemQuantity = (e) => { // change item quantity
        setQuantity(e.target.value); // set quantity
    };

    const submitData = () => {
        createInventoryItem();
    };
    
    return (
        <div className='add-inventory-item' >  
            <label style={{fontSize: 'x-large'}} className='add-inventory-item-title' >Add Inventory Item</label> 
            <div className='item-textfields' > 
                <TextField id='item-name-entry' label='Enter Item Name' variant='outlined' margin='normal' onChange={changeItemName} />
                <TextField id='item-quantity-entry' label='Enter Item Quantity' variant='outlined' margin='normal' onChange={changeItemQuantity} />
            </div>
            <Link
                to={{
                    pathname: '/manager/inventory' // go to inventory

                }}
            >
                <Button variant='outlined' margin='normal' onClick={submitData} >Submit</Button> 
            </Link>
        </div>
    );
};

export default AddInventoryItem; // export add inventory item