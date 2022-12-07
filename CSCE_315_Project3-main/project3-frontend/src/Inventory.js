import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { default as LinkComp } from '@mui/material/Link';
import apiClient from './services/apiClient';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './css/Inventory.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'ingredient_name', headerName: 'Ingredient Name', width: 385 },
  { field: 'quantity', headerName: 'Quantity', width: 385 },
];

const Inventory = () => {

    const [ table, setTable ] = useState(null);
    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ sortBy, setSortBy ] = useState('Ingredient Name');
    const [ items, setItems ] = useState({});
    const [ isDescending, setIsDescending ] = useState(false);

    const api = apiClient; // apiClient is a singleton
    let inventoryItems = null;

    const fetchInventory = async () => { // this is an async function
        inventoryItems = await api.fetchInventory(); //  get the inventory items from the api
        setItems(inventoryItems);
        setTable(
            <DataGrid 
                rows={inventoryItems.data.sort(function(a, b){return a.ingredient_name.localeCompare(b.ingredient_name)})} 
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedRowsData = ids.map((id) => inventoryItems.data.find((row) => row.id === id));
                    setSelectedItems(selectedRowsData);      
                }}
            />
        );
    };

    const removeInventoryItems = () => {
        selectedItems.map(async (row) => {
            const { data, error } = await api.deleteInventoryItem(row.id);
        });
        fetchInventory();
    };

    const changeSortBy = (e) => {
        setSortBy(e.target.value);
    };

    const changeIsDescending = (e) => {
        if (e.target.checked === true) {
            setIsDescending(true);
        } else {
            setIsDescending(false);
        }
    };

    const sortItems = () => {
        let itemsToSort = [...items.data];
        if (isDescending === false) {
            setTable(
                <DataGrid
                    rows={(sortBy === 'ID') ? itemsToSort.sort(function(a, b){return a.id - b.id}) : 
                          (sortBy === 'Quantity') ? itemsToSort.sort(function(a, b){return a.quantity - b.quantity}) :
                          itemsToSort.sort(function(a, b){return a.ingredient_name.localeCompare(b.ingredient_name)})} 
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => itemsToSort.find((row) => row.id === id));
                        setSelectedItems(selectedRowsData);      
                    }}
                />
            );
        } else {
            setTable(
                <DataGrid
                    rows={(sortBy === 'ID') ? itemsToSort.sort(function(a, b){return b.id - a.id}) : 
                          (sortBy === 'Quantity') ? itemsToSort.sort(function(a, b){return b.quantity - a.quantity}) :
                          itemsToSort.sort(function(a, b){return b.ingredient_name.localeCompare(a.ingredient_name)})} 
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => itemsToSort.find((row) => row.id === id));
                        setSelectedItems(selectedRowsData);      
                    }}
                />
            );
        }
    };

    useEffect( // this is a React hook that runs when the component is mounted
        () => {
            fetchInventory(); // call fetchInventory
        }, [] // evert time page is loaded
    ); 

    return (
        <div className='inventory' > 
            <div>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        sx={{ className: 'sales-nav' }}
                        value='Inventory'
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab 
                            value="Sales" 
                            label="Sales" 
                            //link to server page hello test 
                            component={LinkComp}
                            href="/manager/sales"
                        />
                        <Tab 
                            value="Restock" 
                            label="Restock"
                            //link to server page
                            component={LinkComp}
                            href="/manager/restock"
                        />
                        <Tab 
                            value="Excess" 
                            label="Excess" 
                            //link to server page
                            component={LinkComp}
                            href="/manager/excess"
                        />
                        <Tab 
                            value="Pair" 
                            label="Pair" 
                            //link to server page
                            component={LinkComp}
                            href="/manager/pair"
                        />
                        <Tab 
                            value="Menu" 
                            label="Menu" 
                            //link to server page
                            component={LinkComp}
                            href="/manager/menu"
                        />
                        <Tab 
                            value="Inventory" 
                            label="Inventory" 
                            //link to server page
                            component={LinkComp}
                            href="/manager/inventory"
                        />
                    </Tabs>
                </Box>
            </div>
            <div className='inventory-buttons' >
                <div className='add-button' >
                    <Link
                        to={{
                        pathname: '/manager/inventory/add'
                        }}
                    >
                        <Button variant='outlined' margin='normal' >Add Item</Button>
                    </Link>
                </div>
                <div className='edit-button' >
                    <Link
                        to={{
                            pathname: '/manager/inventory/edit'
                        }}
                        state={{
                            selectedItems: selectedItems
                        }}
                    >
                    <Button variant='outlined' margin='normal' onClick={() => {console.log(selectedItems)}} >Edit Item(s)</Button>
                    </Link>
                </div>
                <div className='remove-button' >
                    <Button variant='outlined' margin='normal' onClick={removeInventoryItems} >Remove Item(s)</Button>
                </div>
                <div className='sort-data' >
                    <FormControl fullWidth>
                        <InputLabel>Sort By:</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By:"
                            onChange={changeSortBy}
                            autoWidth
                        >
                            <MenuItem value='ID' >ID</MenuItem>
                            <MenuItem value='Ingredient Name' >Ingredient Name</MenuItem>
                            <MenuItem value='Quantity' >Quantity</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControlLabel
                    control={
                        <Checkbox onClick={changeIsDescending} name="Descending" />
                    }
                    label="Descending"
                />
                <div className='sort-button' >
                    <Button variant='outlined' margin='dense' onClick={sortItems} >Sort</Button>
                </div>
            </div>
            <div className='table' style={{ opacity: .8, backgroundColor: '#FFFFFF', height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
};

export default Inventory;
