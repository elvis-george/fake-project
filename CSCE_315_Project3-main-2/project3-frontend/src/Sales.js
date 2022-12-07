import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { default as LinkComp } from '@mui/material/Link';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import apiClient from './services/apiClient';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './css/Sales.css';

const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'count', headerName: 'Count', width: 300 },
];

export default function Sales() {   

    const [ table, setTable ] = useState(   //creates a state variable called table and a function called setTable
        <DataGrid   // creates a DataGrid component
            rows={[]}
            getRowId={(row) => salesItems.data.indexOf(row)}
            columns={columns}
        />
    );
    const [ startDate, setStartDate ] = useState('');   //creates a state variable called startDate and a function called setStartDate
    const [ endDate, setEndDate ] = useState('');       
    const [ sortBy, setSortBy ] = useState('Name');       
    const [ items, SetItems ] = useState({});
    const [ isDescending, setIsDescending ] = useState(false);

    const api = apiClient; // apiClient is a singleton
    let salesItems = null;

    const fetchSalesReport = async () => { // this is an async function
        salesItems = await api.fetchSalesReport(startDate, endDate); //  get the inventory items from the api
        SetItems(salesItems);
        await console.log(salesItems); // log the inventory items to the console
        setTable(
            <DataGrid
                rows={salesItems.data}
                getRowId={(row) => salesItems.data.indexOf(row)}
                columns={columns}
            />
        );
    };
 
    const changeStartDate = (e) => {    
        setStartDate(e.target.value);
    };
    
    const changeEndDate = (e) => {
        setEndDate(e.target.value);
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
        let itemsToSort = [...items.data];  // make a copy of the items
        if (isDescending === true) {    
            setTable(
                <DataGrid
                    rows={(sortBy === 'Name') ? itemsToSort.sort(function(a, b){return b.name.localeCompare(a.name)}) : 
                                itemsToSort.sort(function(a, b){return b.count - a.count})}
                    columns={columns}
                    getRowId={(row) => items.data.indexOf(row)}
                />
            );
        } else {
            setTable(   
                <DataGrid
                    rows={(sortBy === 'Name') ? itemsToSort.sort(function(a, b){return a.name.localeCompare(b.name)}) : 
                                itemsToSort.sort(function(a, b){return a.count - b.count})}
                    columns={columns}
                    getRowId={(row) => items.data.indexOf(row)}
                />
            );
        }
    };

    return (
        <div className='sales' > 
            <div className='sales-nav-bar' >
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        sx={{ className: 'sales-nav' }}
                        value='Sales'
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
            <div className='sales-buttons' >
                <TextField sx={{marginRight: '4%'}} id='start-date-entry' label='Enter Starting Date' placeholder='YYYY-MM-DD' variant='outlined' margin='normal' onChange={changeStartDate }  />
                <TextField  sx={{marginRight: '4%'}} id='end-date-entry' label='Enter Ending Date' placeholder='YYYY-MM-DD' variant='outlined' margin='normal' onChange={changeEndDate} />
                <Button sx={{alignSelf: 'center'}} variant='outlined' margin='normal' onClick={fetchSalesReport} >Submit</Button>
                <div className='sort-data' >
                    <FormControl fullWidth>
                        <InputLabel>Sort By:</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By:"
                            onChange={changeSortBy}
                            autoWidth
                        >
                            <MenuItem value='Name' >Name</MenuItem>
                            <MenuItem value='Count' >Count</MenuItem>
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
            <div style={{ opacity: .8, backgroundColor: '#FFFFFF', height: 400, width: '60%', marginTop: '2%' }}> 
                {table}
            </div>
        </div>
    );
}
