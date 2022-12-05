import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './css/Server.css';
import apiClient from './services/apiClient';

const Server = () => {

    const api = apiClient;

    const [ base, setBase ] = useState("");
    const [ protein, setProtein ] = useState("");
    const [ starter, setStarter ] = useState("");
    const [ combo, setCombo ] = useState(false);

    const baseIds = ["Grain Bowl", "Salad", "Pita", "Greens and Grains"];
    const proteinIds = ["Gyro", "Falafel", "Vegetable Medley", "Meatballs", "Chicken"];
    const starterIds = ["2 Falafels", "Hummus and Pita", "Vegan Box", "Garlic Fries"];

    const cost = null;

    const addOrder = async orders => {
        const { data, error } = await api.addOrder(orders);
        await console.log(data);
    };

    const changeBase = (e) => {
        setBase(e.target.value);
    };

    const changeProtein = (e) => {
        setProtein(e.target.value);
    };

    const changeStarter = (e) => {
        setStarter(e.target.value);
    };
    
    const changeCombo = (e) => {
        if (e.target.checked === true) {
            setCombo(true);
        } else {
            setCombo(false);
        }
    };

    const submitOrder = () => {
        let orders = null;
        if (base !== '' && starter === '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : String(combo),
                        "starterId" : '',
                        "baseId"    : String(baseIds.indexOf(base) + 1),
                        "proteinId" : String(proteinIds.indexOf(protein) + 1)
                    },
                ]
            };
        } else if (base === '' && starter !== '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : "",
                        "starterId" : String(starterIds.indexOf(starter) + 1),
                        "baseId"    : "",
                        "proteinId" : ""
                    },
                ]
            };
        } else if (base !== '' && starter !== '') {
            orders = {
                "employeeId": "1",
                "items" : [
                    {
                        "isCombo"   : String(combo),
                        "starterId" : '',
                        "baseId"    : String(baseIds.indexOf(base) + 1),
                        "proteinId" : String(proteinIds.indexOf(protein) + 1)
                    },
                    {
                        "isCombo"   : "",
                        "starterId" : String(starterIds.indexOf(starter) + 1),
                        "baseId"    : "",
                        "proteinId" : ""
                    },
                ]
            };
        }
        console.log(orders);
        addOrder(orders);
        setBase(null);
        setProtein(null);
        setStarter(null);
        setCombo(false);
    };

    const createCartItems = () => {
        let baseItem = null;
        let proteinItem = null;
        let starterItem = null;
        let comboText = null;

        if (base !== "" && base !== null) {
            baseItem = (
                <Card
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 300,
                        height: 100,
                        marginTop: 5,
                        marginLeft: 16,
                        backgroundColor: '#F5FFFA'
                    }}
                >
                    <label>{base}</label>
                </Card>
            );
        }
        if (protein !== "" && protein !== null) {
            proteinItem = (
                <Card
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 300,
                        height: 100,
                        marginTop: 5,
                        marginLeft: 16,
                        backgroundColor: '#F5FFFA'
                    }}
                >
                    <label>{protein}</label>
                </Card>
            );
        }
        if (starter !== "" && starter !== null) {
            starterItem = (
                <Card
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 300,
                        height: 100,
                        marginTop: 5,
                        marginLeft: 16,
                        backgroundColor: '#F5FFFA'
                    }}
                >
                    <label>{starter}</label>
                </Card>
            );
        }
        if (combo === true) {
            comboText = <label>+ Combo</label>
        }

        return (
            <div>
                {baseItem}
                {proteinItem}
                {starterItem}
                {comboText}
            </div>
        );
    };

    let cartItems = createCartItems();

    return (
        <div className='server' >
            <div className='server-panel' >
                <label className='server-panel-label' >Server</label>
                <div className='meal-options' >
                    <div className='bases-meal-option' >
                        <FormControl>
                            <FormLabel id="bases-controlled-radio-buttons-group">Bases</FormLabel>
                            <RadioGroup
                                aria-labelledby="bases-controlled-radio-buttons-group"
                                name="bases-controlled-radio-buttons-group"
                                value={base === '' ? null : base}
                                onChange={changeBase}
                            >
                                <FormControlLabel value="Grain Bowl" control={<Radio />} label="Grain Bowl" />
                                <FormControlLabel value="Salad" control={<Radio />} label="Salad" />
                                <FormControlLabel value="Pita" control={<Radio />} label="Pita" />
                                <FormControlLabel value="Greens and Grains" control={<Radio />} label="Greens and Grains" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='proteins-meal-option' >
                        <FormControl>
                            <FormLabel id="proteins-controlled-radio-buttons-group">Proteins</FormLabel>
                            <RadioGroup
                                aria-labelledby="proteins-controlled-radio-buttons-group"
                                name="proteins-controlled-radio-buttons-group"
                                value={protein === '' ? null : protein}
                                onChange={changeProtein}
                            >
                                <FormControlLabel value="Gyro" control={<Radio />} label="Gyro" />
                                <FormControlLabel value="Falafel" control={<Radio />} label="Falafel" />
                                <FormControlLabel value="Vegetable Medley" control={<Radio />} label="Vegetable Medley" />
                                <FormControlLabel value="Meatballs" control={<Radio />} label="Meatballs" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='starters-meal-option' >
                        <FormControl>
                            <FormLabel id="starters-controlled-radio-buttons-group">Starters</FormLabel>
                            <RadioGroup
                                aria-labelledby="starters-controlled-radio-buttons-group"
                                name="starters-controlled-radio-buttons-group"
                                value={starter === '' ? null : starter}
                                onChange={changeStarter}
                            >
                                <FormControlLabel value="2 Falafels" control={<Radio />} label="2 Falafels" />
                                <FormControlLabel value="Hummus & Pita" control={<Radio />} label="Hummus & Pita" />
                                <FormControlLabel value="Vegan Box" control={<Radio />} label="Vegan Box" />
                                <FormControlLabel value="Garlic Fries" control={<Radio />} label="Garlic Fries" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className='combo-box' >
                    <FormControlLabel control={<Checkbox checked={combo} onClick={changeCombo} />} label='Combo' />
                </div>
            </div>
            <div className='cart-area' >
                <Card
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 570,
                        height: 650,
                        backgroundColor: '#FFFAF0'
                    }}
                >
                    <label className='cart-title-server' >Cart</label>
                    {cartItems}
                </Card>
                <label className='order-total' >Order Total: {cost}</label>
                <div className='submit-button' >
                    <Button sx={{backgroundColor: 'white', width: '120%'}} variant='outlined' margin='normal' onClick={submitOrder} >Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Server;