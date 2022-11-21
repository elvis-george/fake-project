import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import './css/Excess.css';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'sales', headerName: 'Sales', width: 200},
    { field: 'currentInventory', headerName: 'Current Inventory', width: 200 },
];

const rows = [

];

export default function Excess() {

    const [ table, setTable ] = useState(
        <DataGrid
            rows={[]}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );

    return (
        <div className='excess' >
            <div>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        sx={{ className: 'sales-nav' }}
                        value='Excess'
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab 
                            value="sales" 
                            label="sales" 
                            //link to server page hello test
                            component={Link}
                            href="/manager/sales"
                        />
                        <Tab 
                            value="Restock" 
                            label="Restock"
                            //link to server page
                            component={Link}
                            href="/manager/restock"
                        />
                        <Tab 
                            value="Excess" 
                            label="Excess" 
                            //link to server page
                            component={Link}
                            href="/manager/excess"
                        />
                        <Tab 
                            value="Pair" 
                            label="Pair" 
                            //link to server page
                            component={Link}
                            href="/manager/pair"
                        />
                        <Tab 
                            value="Menu" 
                            label="Menu" 
                            //link to server page
                            component={Link}
                            href="/manager/menu"
                        />
                        <Tab 
                            value="Inventory" 
                            label="Inventory" 
                            //link to server page
                            component={Link}
                            href="/manager/inventory"
                        />
                    </Tabs>
                </Box>
                <div className='excess-input' >
                    <div className='excess-input-text' >
                        <TextField id='timestamp-entry' label='Enter Starting Time' variant='outlined' margin='normal'  />
                    </div>
                    <div className='excess-input-button' >
                        <Button variant='outlined' margin='normal'  >Submit</Button>
                    </div>
                </div>
            </div>
            <div style={{ height: 400, width: '40%' }}>
                {table}
            </div>
        </div>
    );
}
