import React, { useEffect, useState } from 'react';
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

    const api = apiClient; //apiClient is a class that has all the api calls

    const [ base, setBase ] = useState(""); // creates a state variable called base and a function called setBase
    const [ protein, setProtein ] = useState(""); // creates a state variable called protein and a function called setProtein
    const [ starter, setStarter ] = useState(""); // creates a state variable called starter and a function called setStarter
    const [ combo, setCombo ] = useState(false); // creates a state variable called combo and a function called setCombo
    const [ cost, setCost ] = useState(0.00); // creates a state variable called cost and a function called setCost
    const [ wasComboSet, setWasComboSet ] = useState(false);

    const baseIds = ["Grain Bowl", "Salad", "Pita", "Greens and Grains"]; // creates an array of baseIds
    const proteinIds = ["Gyro", "Falafal", "Vegetable Medley", "Meatballs", "Chicken"]; // creates an array of proteinIds
    const starterIds = ["2 Falafels", "Hummus and Pita", "Vegan Box", "Garlic Fries"]; // creates an array of starterIds

    const addOrder = async orders => { // creates a function called addOrder that takes in an array of orders
        const { data, error } = await api.addOrder(orders); // creates a variable called data and a variable called error that are the result of calling the addOrder function in apiClient
        await console.log(data); // prints the data to the console
    };

    const changeBase = (e) => { // creates a function called changeBase that takes in an event
        setBase(e.target.value); // sets the base state variable to the value of the event
        setCost(cost + 7.49);
    };

    const changeProtein = (e) => { // creates a function called changeProtein that takes in an event
        setProtein(e.target.value); // sets the protein state variable to the value of the event
    };

    const changeStarter = (e) => { // creates a function called changeStarter that takes in an event
        setStarter(e.target.value); // sets the starter state variable to the value of the event

        if (e.target.value === "2 Falafels") {
            setCost(2.85);
            if (base !== '') {
                setCost(2.85 + 7.49);
            }
        } else if (e.target.value === "Hummus & Pita") {
            setCost(3.50);
            if (base !== '') {
                setCost(3.50 + 7.49);
            }
        } else if (e.target.value === "Vegan Box") {
            setCost(6.49);
            if (base !== '') {
                setCost(6.49 + 7.49);
            }
        } else if (e.target.value === "Garlic Fries") {
            setCost(1.99);
            if (base !== '') {
                setCost(1.99 + 7.49);
            }
        }
    };
    
    const changeCombo = (e) => { // creates a function called changeCombo that takes in an event
        if (e.target.checked === true) { // if the event target is checked
            setCombo(true); // set the combo state variable to true
            if (!wasComboSet) {
                setWasComboSet(true);
                setCost(cost + 2.00);
            }
        } else {    // otherwise
            setCombo(false); // set the combo state variable to false
            if (wasComboSet) {
                setWasComboSet(false);
                setCost(cost - 2.00);
            }
        }
    };

    const submitOrder = () => { // creates a function called submitOrder
        let orders = null;  // creates a variable called orders
        if (base !== '' && starter === '') {    // if the base state variable is not empty and the starter state variable is empty
            orders = {  // set the orders variable to an object
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
        } else if (base === '' && starter !== '') {     // if the base state variable is empty and the starter state variable is not empty
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
        } else if (base !== '' && starter !== '') {     // if the base state variable is not empty and the starter state variable is not empty
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
        setCost(0.00);
    };

    const createCartItems = () => {     // creates a function called createCartItems
        let baseItem = null;
        let proteinItem = null;
        let starterItem = null;
        let comboText = null;

        if (base !== "" && base !== null) {     // if the base state variable is not empty and the base state variable is not null
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
        if (protein !== "" && protein !== null) {       // if the protein state variable is not empty and the protein state variable is not null
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
        if (starter !== "" && starter !== null) {       // if the starter state variable is not empty and the starter state variable is not null
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
        if (combo === true) {       // if the combo state variable is true
            comboText = <div className='combo-text' >
            <label> + Combo</label>
        </div>
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

    let cartItems = createCartItems();      // creates a variable called cartItems that is the result of calling the createCartItems function

    return (
        <div className='server' >
            <div className='server-panel' >
                <label className='server-panel-label' >Server</label>
                <div className='meal-options' >
                    <div className='bases-meal-option' >
                        <FormControl >
                            <FormLabel id="bases-controlled-radio-buttons-group"><h2>Bases</h2></FormLabel>
                            <RadioGroup 
                                aria-labelledby="bases-controlled-radio-buttons-group"
                                name="bases-controlled-radio-buttons-group"
                                value={base === '' ? null : base}
                                onChange={changeBase}
                            >
                                <FormControlLabel value="Grain Bowl" control={<Radio size="large" />} label="Grain Bowl" />
                                <FormControlLabel value="Salad" control={<Radio size="large" />} label="Salad" />
                                <FormControlLabel value="Pita" control={<Radio size="large" />} label="Pita" />
                                <FormControlLabel value="Greens and Grains" control={<Radio size="large" />} label="Greens and Grains" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='proteins-meal-option' >
                        <FormControl>
                            <FormLabel id="proteins-controlled-radio-buttons-group"><h2>Proteins</h2></FormLabel>
                            <RadioGroup
                                aria-labelledby="proteins-controlled-radio-buttons-group"
                                name="proteins-controlled-radio-buttons-group"
                                value={protein === '' ? null : protein}
                                onChange={changeProtein}
                            >
                                <FormControlLabel value="Gyro" control={<Radio size="large"/>} label="Gyro" />
                                <FormControlLabel value="Falafal" control={<Radio size="large" />} label="Falafel" />
                                <FormControlLabel value="Vegetable Medley" control={<Radio size="large"  />} label="Vegetable Medley" />
                                <FormControlLabel value="Meatballs" control={<Radio size="large"  />} label="Meatballs" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='starters-meal-option' >
                        <FormControl>
                            <FormLabel id="starters-controlled-radio-buttons-group"> <h2>Starters</h2></FormLabel>
                            <RadioGroup
                                aria-labelledby="starters-controlled-radio-buttons-group"
                                name="starters-controlled-radio-buttons-group"
                                value={starter === '' ? null : starter}
                                onChange={changeStarter}
                            > 
                            {/* label={<Typography variant="body2" color="textSecondary">2 Falafels</Typography>} */}
                                <FormControlLabel value="2 Falafels" control={<Radio size="large"  />}  label = "2 Falafels" />
                                <FormControlLabel value="Hummus and Pita" control={<Radio size="large"  />} label="Hummus & Pita" />
                                <FormControlLabel value="Vegan Box" control={<Radio size="large"  />} label="Vegan Box" />
                                <FormControlLabel value="Garlic Fries" control={<Radio size="large"  />} label="Garlic Fries" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className='combo-box' >
                    <FormControlLabel control={<Checkbox  size="large"  checked={combo} onClick={changeCombo} />} label='Combo' />
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