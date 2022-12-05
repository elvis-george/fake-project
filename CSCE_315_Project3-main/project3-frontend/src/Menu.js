import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { default as LinkComp } from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import apiClient from './services/apiClient.js'
import './css/Menu.css';

const columns = [
    { field: 'name', headerName: 'Name', width: 550 },
  ];

const Menu = () => {

    const api = apiClient;

    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ table, setTable ] = useState(
        <DataGrid
            rows={[]}
            getRowId={(row) => menuItems.data.indexOf(row)}
            columns={columns}
            checkboxSelection
        />
    );

    let menuItems = null;

    const fetchMenuItems = async () => {
        menuItems = await api.fetchMenuItems();
        await console.log(menuItems);
        setTable(
            <DataGrid 
                rows={menuItems.data.menu.sort(function(a, b){return a.name.localeCompare(b.name)})}
                getRowId={(row) => menuItems.data.menu.indexOf(row)}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedRowsData = ids.map((id) => menuItems.data.menu.find((row) => menuItems.data.menu.indexOf(row) === id));
                    setSelectedItems(selectedRowsData);   
                }}
            />
        );
    };

    const removeMenuItems = () => {
        selectedItems.map(async (row) => {
            //const { data, error } = await api.deleteMenuItem(row.id);
            //console.log(data);
        });
        fetchMenuItems();
    };

    useEffect(() => {
        fetchMenuItems();
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
            </div>
            <div style={{ height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
};

export default Menu;