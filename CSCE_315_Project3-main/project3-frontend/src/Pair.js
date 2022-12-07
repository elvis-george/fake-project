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
import './css/Pair.css';

const columns = [
    { field: 'item1', headerName: 'Item 1', width: 300 },
    { field: 'item2', headerName: 'Item 2', width: 300 },
    { field: 'count', headerName: 'Count', width: 300 },
];

export default function Pair() { // this creates a react component called Pair

    const [ table, setTable ] = useState( // this creates a state variable called table and a function called setTable
        <DataGrid // this is the default table
            rows={[]}
            getRowId={(row) => pairItems.data.indexOf(row)} // this is the id of the row
            columns={columns}
        />
    );
    const [ startDate, setStartDate ] = useState(''); // this creates a state variable called startDate and a function called setStartDate
    const [ endDate, setEndDate ] = useState(''); // this creates a state variable called endDate and a function called setEndDate
    const [ sortBy, setSortBy ] = useState('Item1'); // this creates a state variable called sortBy and a function called setSortBy
    const [ items, SetItems ] = useState({}); // this creates a state variable called items and a function called SetItems
    const [ isDescending, setIsDescending ] = useState(false); // this creates a state variable called isDescending and a function called setIsDescending

    const api = apiClient; // apiClient is a singleton
    let pairItems = null;

    const fetchPairs = async () => { // this is an async function
        console.log(startDate, endDate);
        pairItems = await api.popularPairs(startDate, endDate); //  get the inventory items from the api
        SetItems(pairItems);
        await console.log(pairItems); // log the inventory items to the console
        setTable(
            <DataGrid
                rows={pairItems.data}
                getRowId={(row) => pairItems.data.indexOf(row)}
                columns={columns}
            />
        );
    };

    const changeStartDate = (e) => { // this is a function that changes the state of startDate
        setStartDate(e.target.value);
    };
    
    const changeEndDate = (e) => { // this is a function that changes the state of endDate
        setEndDate(e.target.value);
    };

    const changeSortBy = (e) => { // this is a function that changes the state of sortBy
        setSortBy(e.target.value);
    };
    
    const changeIsDescending = (e) => { // this is a function that changes the state of isDescending
        if (e.target.checked === true) {
            setIsDescending(true);
        } else {
            setIsDescending(false);
        }
    };

    const sortItems = () => { // this is a function that sorts the items
        let itemsToSort = [...items.data];
        if (isDescending === true) { // if isDescending is true, sort the items in descending order
            setTable(
                <DataGrid 
                    rows={(sortBy === 'Item1') ? itemsToSort.sort(function(a, b){return b.item1.localeCompare(a.item1)}) : 
                                (sortBy === 'Item2') ? itemsToSort.sort(function(a, b){return b.item2.localeCompare(a.item2)}) :
                                    itemsToSort.sort(function(a, b){return b.count - a.count})}
                    columns={columns}
                    getRowId={(row) => items.data.indexOf(row)}
                />
            );
        } else { // if isDescending is false, sort the items in ascending order
            setTable(
                <DataGrid
                    rows={(sortBy === 'Item1') ? itemsToSort.sort(function(a, b){return a.item1.localeCompare(b.item1)}) :  
                                (sortBy === 'Item2') ? itemsToSort.sort(function(a, b){return a.item2.localeCompare(b.item2)}) :
                                    itemsToSort.sort(function(a, b){return a.count - b.count})}
                    columns={columns}
                    getRowId={(row) => items.data.indexOf(row)} 
                />
            );
        }
    };

    return ( // this is the return statement
        <div className='pair' >
            <div className='pair-nav-bar' >
                <Box sx={{ width: '100%' }}> 
                    <Tabs
                        sx={{ className: 'pair-nav' }}
                        value='Pair'
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
            <div className='pair-buttons' >
                <TextField sx={{marginRight: '4%'}} id='start-date-entry' label='Enter Starting Date' placeholder='YYYY-MM-DD' variant='outlined' margin='normal' onChange={changeStartDate }  />
                <TextField  sx={{marginRight: '4%'}} id='end-date-entry' label='Enter Ending Date' placeholder='YYYY-MM-DD' variant='outlined' margin='normal' onChange={changeEndDate} />
                <Button sx={{alignSelf: 'center'}} variant='outlined' margin='normal' onClick={fetchPairs} >Submit</Button>
                <div className='sort-data-pair' >
                    <FormControl fullWidth>
                        <InputLabel>Sort By:</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By:"
                            onChange={changeSortBy}
                        >
                            <MenuItem value='Item1' >Item 1</MenuItem>
                            <MenuItem value='Item2' >Item 2</MenuItem>
                            <MenuItem value='Count' >Count</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='sort-descending-pair' >
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
            <div style={{opacity: .8, backgroundColor: '#FFFFFF',height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
}
