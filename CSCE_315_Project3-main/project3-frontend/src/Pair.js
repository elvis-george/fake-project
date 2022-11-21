import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { default as LinkComp } from '@mui/material/Link';
import Link from '@mui/material/Link';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import apiClient from './services/apiClient';
import './css/Pair.css';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'protein', headerName: 'Protein', width: 200 },
    { field: 'count', headerName: 'Count', width: 200 }
];

export default function Pair() {

    const [ table, setTable ] = useState(
        <DataGrid
            rows={[]}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );

    const api = apiClient; // apiClient is a singleton
    let pairItems = null;

return (
    <div className='pair' >
        <div>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    sx={{ className: 'sales-nav' }}
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
        <div className='pair-table' style={{ height: 400, width: '40%' }}>
            {table}
        </div>
    </div>
    );
}
