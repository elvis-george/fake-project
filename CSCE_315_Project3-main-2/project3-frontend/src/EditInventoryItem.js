import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './css/EditInventoryItem.css';
import apiClient from './services/apiClient';

/**
 * This function allows the user to use the frontend to edit a pre-existing inventory item
 * @returns The updated inventory
 */
const EditInventoryItem = () => {

    const api = apiClient;

    const location = useLocation();
    const from = location.state;

    const submitInventoryChanges = () => {
        from.selectedItems.map(async (row) => {
            const updatedItem = {
                ingredient_name: row.ingredient_name,
                quantity: row.quantity
            };
            const { data, error } = await api.editInventoryItem(updatedItem, row.id);
        });
    }

    return (
        <div className='edit-inventory-item' >
            <label className='edit-inventory-item-title' >Edit Ingredients</label>
            <div className='inventory-edit-rows' >
                {
                    from.selectedItems.map((row) => {
                        return (
                            <div key={row.id} className='inventory-edit-row' >
                                <label className='inventory-edit-row-name' key={row.id} >{row.ingredient_name}:</label>
                                <div className='inventory-edit-row-name-entry' >
                                    <TextField 
                                        id='item-name-entry'
                                        label='New Item Name'
                                        variant='outlined'
                                        margin='normal'
                                        onChange={(e) => {row.ingredient_name = e.target.value; console.log(from.selectedItems)}}
                                    />
                                </div>
                                <div className='inventory-edit-row-quantity-entry' >
                                    <TextField 
                                        id='item-quantity-entry'
                                        label='New Item Quantity'
                                        variant='outlined'
                                        margin='normal'
                                        onChange={(e) => {row.quantity = parseFloat(e.target.value)}}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Link
                to={{
                    pathname: '/manager/inventory'
                }}
            >
                <Button onClick={submitInventoryChanges} >
                    Submit Changes
                </Button>
            </Link>
        </div>
    );
};

export default EditInventoryItem;