import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { default as LinkComp } from '@mui/material/Link';
import Link from '@mui/material/Link';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import apiClient from './services/apiClient';
import './css/Restock.css';

const columns = [
    { field: 'ingredient_name', headerName: 'Restock Item', width: 600 },
];

export default function Restock() { // k

    const api = apiClient; // apiClient is a singleton
    let restockItems = null;

    const [ items, setItems ] = useState({}); // this is a state variable called items and a function called setItems
    const [ selectedItems, setSelectedItems ] = useState([]);   // this is a state variable called selectedItems and a function called setSelectedItems
    const [ sortBy, setSortBy ] = useState('Restock Item');  // this is a state variable called sortBy and a function called setSortBy
    const [ isDescending, setIsDescending ] = useState(false); // this is a state variable called isDescending and a function called setIsDescending
    const [ inventoryItems, setInventoryItems ] = useState(null);
    const [ table, setTable ] = useState( // this is a state variable called table and a function called setTable
        <DataGrid
            rows={[]}
            getRowId={(row) => restockItems.data.indexOf(row)}
            columns={columns}
            checkboxSelection
        />
    );

    const changeSortBy = (e) => { // this line is a function called changeSortBy
        setSortBy(e.target.value);
    };

    const changeIsDescending = (e) => { // this is a function called changeIsDescending
        if (e.target.checked === true) {
            setIsDescending(true);
        } else {
            setIsDescending(false);
        }
    };

    const fetchRestockReport = async () => { // this is a function called fetchRestockReport
        restockItems = await api.restockReport(); // restockItems is a variable that is equal to the restockReport function in apiClient
        setItems(restockItems); // this is a console log of the restockItems data
        await console.log(restockItems.data); // this line sets the table to the restockItems data
        setTable(
            <DataGrid 
                rows={restockItems.data.sort(function(a, b){return a.ingredient_name.localeCompare(b.ingredient_name)})} // this line sets the rows to the restockItems data
                getRowId={(row) => restockItems.data.indexOf(row)} // this line creates a unique id for each row
                columns={columns} // this line sets the columns to the columns variable
                checkboxSelection // this line allows for the checkbox selection
                onSelectionModelChange={(ids) => { // this line allows for the selection of multiple rows
                    const selectedRowsData = ids.map((id) => restockItems.data.find((row) => restockItems.data.indexOf(row) === id));
                    setSelectedItems(selectedRowsData);   
                }}
            />
        );
    };

    const doRestock = async () => {
        console.log(inventoryItems);
        selectedItems.map(async (row) => {
            for (let i = 0; i < inventoryItems.length; i += 1) {
                if (row.ingredient_name === inventoryItems[i].ingredient_name) {
                    const updatedItem = {
                        ingredient_name: inventoryItems[i].ingredient_name,
                        quantity: inventoryItems[i].quantity + 100
                    };
                    const { data, error } = await api.editInventoryItem(updatedItem, inventoryItems[i].id);
                    console.log(data);
                }
            }
        });
        fetchRestockReport();
    };

    const sortItems = () => {
        let itemsToSort = [...items.data];
        if (isDescending === true) {
            setTable(
                <DataGrid 
                    rows={itemsToSort.sort(function(a, b){return b.ingredient_name.localeCompare(a.ingredient_name)})}
                    getRowId={(row) => itemsToSort.indexOf(row)}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => itemsToSort.find((row) => itemsToSort.indexOf(row) === id));
                        setSelectedItems(selectedRowsData);   
                    }}
                />
            );
        } else {
            setTable(
                <DataGrid 
                    rows={itemsToSort.sort(function(a, b){return a.ingredient_name.localeCompare(b.ingredient_name)})}
                    getRowId={(row) => itemsToSort.indexOf(row)}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => itemsToSort.find((row) => itemsToSort.indexOf(row) === id));
                        setSelectedItems(selectedRowsData);   
                    }}
                />
            );
        }
    };

    const getInventoryItems = async () => {
        const { data, error } = await api.fetchInventory();
        setInventoryItems(data);
    };

    useEffect(() => {
        console.log(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
        fetchRestockReport();
    }, []);

    useEffect(() => {
        getInventoryItems();
    }, []);

    return (
        <div className='restock' >
            <div className='restock-nav-bar' >
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        sx={{ className: 'sales-nav' }}
                        value='Restock'
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
            <div className='restock-button-and-sort' >
                <div className='restock-button' >
                    <Button variant='outlined' margin='normal' onClick={doRestock} >Restock</Button>
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
                            <MenuItem value='Restock Item' >Restock Item</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='sort-descending' >
                    <FormControlLabel
                        control={
                            <Checkbox onClick={changeIsDescending} name="Descending" />
                        }
                        label="Descending"
                    />
                </div>
                <div className='sort-button' >
                    <Button variant='outlined' margin='dense' onClick={sortItems} >Sort</Button>
                </div>
            </div>
            <div style={{opacity: .8, backgroundColor: '#FFFFFF', height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
}
