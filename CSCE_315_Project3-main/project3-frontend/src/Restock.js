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

export default function Restock() {

    const api = apiClient; // apiClient is a singleton
    let restockItems = null;

    const [ items, setItems ] = useState({});
    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ sortBy, setSortBy ] = useState('Restock Item');
    const [ isDescending, setIsDescending ] = useState(false);
    const [ table, setTable ] = useState(
        <DataGrid
            rows={[]}
            getRowId={(row) => restockItems.data.indexOf(row)}
            columns={columns}
            checkboxSelection
        />
    );

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

    const fetchRestockReport = async () => {
        restockItems = await api.restockReport();
        setItems(restockItems);
        await console.log(restockItems.data);
        setTable(
            <DataGrid 
                rows={restockItems.data.sort(function(a, b){return a.ingredient_name.localeCompare(b.ingredient_name)})}
                getRowId={(row) => restockItems.data.indexOf(row)}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedRowsData = ids.map((id) => restockItems.data.find((row) => restockItems.data.indexOf(row) === id));
                    setSelectedItems(selectedRowsData);   
                }}
            />
        );
    };

    const doRestock = () => {
        selectedItems.map(async (row) => {
            // const { data, error } = await api.deleteInventoryItem(row.id);
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

    useEffect(() => {
        console.log(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
        fetchRestockReport();
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
            <div style={{ height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
}
