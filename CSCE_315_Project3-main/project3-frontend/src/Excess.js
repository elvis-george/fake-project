import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import './css/Excess.css';
import apiClient from './services/apiClient';

//TODO
//pretty much same as sales 
//  async excessReport(fromDate) {
//     return await this.request({endpoint: `orders/excess`, method: `GET`, data: {fromDate}});
// }

const excessitems = apiClient.excessReport();

const columns = [
    { field: 'name', headerName: 'Menu Item', width: 400 },
];


export default function Excess() {
    let excessItems = null;

    const [ table, setTable ] = useState(
        <DataGrid
            rows={[]}
            columns={columns}
        />
    );
    
    const [ fromDate, setFromDate ] = useState('');

    const changeFromDate = (e) => {
        setFromDate(e.target.value);
    }; 
    const submitData = async() =>  {
        console.log("here", fromDate);
        excessItems = await apiClient.excessReport(fromDate);
        setTable(
            <DataGrid
                rows={excessItems.data}
                getRowId={(row) => excessItems.data.indexOf(row)}
                columns={columns}
            />
        );
    }


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
                        {/* add on change for text field below */}
                        
                        <TextField onChange={changeFromDate} id='timestamp-entry' label='Enter Starting Time' variant='outlined' margin='normal'  />
                    </div>
                    <div className='excess-input-button' >
                        <Button onClick={submitData} variant='outlined' margin='normal'  >Submit</Button>
                    </div>
                </div>
            </div>
            <div style={{opacity: .8, backgroundColor: '#FFFFFF', height: 400, width: '60%' }}>
                {table}
            </div>
        </div>
    );
}
