import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { default as LinkComp } from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import apiClient from './services/apiClient.js'
import './css/Menu.css';

const columns = [ // this is the columns of the table
    { field: 'id', headerName: 'ID', width: 75 }, // this is the id of the row
    { field: 'name', headerName: 'Name', width: 385 }, // this is the name of the row
    { field: 'type', headerName: 'Menu Type', width: 385 }  // this is the type of the row
  ];

const Menu = () => { // this does the same thing as the class Menu extends React.Component

    const api = apiClient; // apiClient is a singleton

    const [ menuItems, setMenuItems ] = useState(null); // this creates a state variable called menuItems and a function called setMenuItems
    const [ sortBy, setSortBy ] = useState('Name'); // this creates a state variable called sortBy and a function called setSortBy
    const [ isDescending, setIsDescending ] = useState(false);
    const [ starters, setStarters ] = useState([]); // this creates a state variable called starters and a function called setStarters
    const [ bases, setBases ] = useState([]); // this creates a state variable called bases and a function called setBases
    const [ proteins, setProteins ] = useState([]); 
    const [ selectedItems, setSelectedItems ] = useState([]); // this creates a state variable called selectedItems and a function called setSelectedItems
    const [ table, setTable ] = useState( // this creates a state variable called table and a function called setTable
        <DataGrid 
            rows={[]} // this is the rows of the table
            columns={columns} // this is the columns of the table
            getRowId={(row) => menuItems.indexOf(row)} // this is the id of the row
            checkboxSelection // this is the checkbox of the row
        />
    );

    const getStarters = async () => { // this is a function that gets the starters from the database
        const starterItems = await api.getMenuItemByID('starter'); // this gets the starter items from the database
        setStarters(starterItems.data); // this sets the state variable starters to the starter items from the database
        console.log(starters);
    };

    const getBases = async () => { // this is a function that gets the bases from the database
        const baseItems = await api.getMenuItemByID('base'); // this gets the base items from the database
        setBases(baseItems.data); 
        console.log(bases);
    };

    const getProteins = async () => { // this is a function that gets the proteins from the database
        const proteinItems = await api.getMenuItemByID('protein'); // this gets the protein items from the database
        setProteins(proteinItems.data); 
        console.log(proteins);
    };

    const fetchMenuItems = () => { // this is a function that gets the menu items from the database
        const newStarters = [];
        for (let i = 0; i < starters.length; i += 1) { // this is a for loop that goes through the starters
            newStarters.push( // this pushes the starter items into the newStarters array
                {
                    type: 'starter', // this is the type of the starter
                    id: starters[i].id, // this is the id of the starter
                    name: starters[i].name, // this is the name of the starter
                    quantity: starters[i].quantity, // this is the quantity of the starter
                    price: starters[i].price  // this is the price of the starter
                }
            );
        }
        const newBases = []; // this is a for loop that goes through the bases
        for (let i = 0; i < bases.length; i += 1) {
            newBases.push( // this pushes the base items into the newBases array
                {
                    type: 'base', // this is the type of the base
                    id: bases[i].id, // this is the id of the base
                    name: bases[i].name, // this is the name of the base
                    quantity: bases[i].quantity,  // this is the quantity of the base
                    price: bases[i].price   // this is the price of the base
                }
            );
        }
        const newProteins = [];     // this is a for loop that goes through the proteins
        for (let i = 0; i < proteins.length; i += 1) { // this pushes the protein items into the newProteins array
            newProteins.push( // this pushes the protein items into the newProteins array
                {
                    type: 'protein', // this is the type of the protein
                    id: proteins[i].id, // this is the id of the protein
                    name: proteins[i].name, // this is the name of the protein
                    quantity: proteins[i].quantity, // this is the quantity of the protein
                    price: proteins[i].price // this is the price of the protein
                }
            );
        }

        setMenuItems([...newStarters, ...newBases, ...newProteins]);   
        const menuItemsTest = [...newStarters, ...newBases, ...newProteins];

        if (menuItemsTest !== null && starters.length > 0 && bases.length > 0 && proteins.length > 0) { // this checks if the menu items have been fetched
            setTable(  // this sets the state variable table to the table
                <DataGrid       
                    rows={menuItemsTest.sort(function(a, b){return a.name.localeCompare(b.name)})}
                    columns={columns}
                    getRowId={(row) => menuItemsTest.indexOf(row)}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => menuItemsTest.find((row) => menuItemsTest.indexOf(row) === id));
                        setSelectedItems(selectedRowsData);   
                    }}
                />
            );
        }
    };

    const removeMenuItems = () => {
        selectedItems.map(async (row) => {
            const { data, error } = await api.deleteMenuItem(`${row.type}-${row.id}`);
            console.log(data);
        });
        getStarters();
        getBases();
        getProteins();
        fetchMenuItems();
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
        console.log(menuItems);
        let itemsToSort = [...menuItems];
        if (isDescending === true) {
            setTable(
                <DataGrid
                    rows={(sortBy === 'Name') ? itemsToSort.sort(function(a, b){return b.name.localeCompare(a.name)}) : 
                                (sortBy === 'Type') ? itemsToSort.sort(function(a, b){return b.type.localeCompare(a.type)}) :
                                    itemsToSort.sort(function(a, b){return b.id - a.id})}
                    columns={columns}
                    getRowId={(row) => menuItems.indexOf(row)}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => menuItems.find((row) => menuItems.indexOf(row) === id));
                        setSelectedItems(selectedRowsData);   
                    }}
                />
            );
        } else {
            setTable(
                <DataGrid
                    rows={(sortBy === 'Name') ? itemsToSort.sort(function(a, b){return a.name.localeCompare(b.name)}) :
                                (sortBy === 'Type') ? itemsToSort.sort(function(a, b){return a.type.localeCompare(b.type)}) :
                                    itemsToSort.sort(function(a, b){return a.id - b.id})}
                    columns={columns}
                    getRowId={(row) => menuItems.indexOf(row)}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedRowsData = ids.map((id) => menuItems.find((row) => menuItems.indexOf(row) === id));
                        setSelectedItems(selectedRowsData);   
                    }}
                />
            );
        }
    };

    useEffect(() => {
        if (starters.length > 0 && bases.length > 0 && proteins.length > 0) {
            fetchMenuItems();
        }
    }, [starters, bases, proteins]);

    useEffect(() => {
        getStarters();
        getBases();
        getProteins();
    }, []);

    return (
        <div className='menu' >
            <div className='menu-nav-bar' >
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        sx={{ className: 'menu-nav' }}
                        value='Menu'
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
            <div className='menu-buttons' >
                <Link
                    to={{
                        pathname: '/manager/menu/add'
                    }}
                >
                    <Button variant='outlined' margin='normal' >Add Item</Button>
                </Link>
                <Link
                    to={{
                        pathname: '/manager/menu/edit'
                    }}
                    state={{
                        selectedItems: selectedItems
                    }}
                >
                    <Button variant='outlined' margin='normal' onClick={() => {console.log(selectedItems)}} >Edit Item(s)</Button>
                </Link>
                <Button variant='outlined' margin='normal' onClick={removeMenuItems} >Remove Item(s)</Button>
                <div className='sort-data-menu' >
                    <FormControl fullWidth>
                        <InputLabel>Sort By:</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By:"
                            onChange={changeSortBy}
                        >
                            <MenuItem value='ID' >ID</MenuItem>
                            <MenuItem value='Name' >Name</MenuItem>
                            <MenuItem value='Type' >Type</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='sort-descending-menu' >
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
            <div style={{ opacity: .8, backgroundColor: '#FFFFFF',height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
};

export default Menu;