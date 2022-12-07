import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './css/EditMenuItem.css';
import apiClient from './services/apiClient';

/**
 * This function allows the user to use the frontend to edit a pre-existing menu item
 * @returns The updated menu
 */
const EditMenuItem = () => {

    const api = apiClient;

    const location = useLocation();
    const from = location.state;

    console.log(from);

    const submitMenuChanges = () => {
        from.selectedItems.map(async (row) => {
            const updatedItem = {
                id: row.id,
                name: row.name,
                quantity: row.quantity,
                price: row.price
            };
            const { data, error } = await api.editMenuItem(row.type, updatedItem);
        });
    }

    return (
        <div className='edit-menu-item' >
            <label className='edit-menu-item-title' >Edit Menu Items</label>
            <div className='menu-edit-rows' >
                {
                    from.selectedItems.map((row) => {
                        return (
                            <div key={row.id} className='menu-edit-row' >
                                <label className='menu-edit-row-name' key={row.id} >{row.name}:</label>
                                <div className='menu-edit-row-name-entry' >
                                    <TextField 
                                        id='item-name-entry'
                                        label='New Item Name'
                                        variant='outlined'
                                        margin='normal'
                                        onChange={(e) => {row.name = e.target.value; console.log(from.selectedItems)}}
                                    />
                                </div>
                                <div className='menu-edit-row-quantity-entry' >
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
                    pathname: '/manager/menu'
                }}
            >
                <Button onClick={submitMenuChanges} >
                    Submit Changes
                </Button>
            </Link>
        </div>
    );
};

export default EditMenuItem;