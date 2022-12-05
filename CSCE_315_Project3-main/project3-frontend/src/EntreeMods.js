import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './css/EntreeMods.css';

const EntreeMods = ({ base }) => {

    const location = useLocation();
    const from = location.state;

    const [ protein, setProtein ] = useState("");
    const [ toppings, setToppings ] = useState([]);
    const [ dressings, setDressings ] = useState([]);

    const changeProtein = (e) => {
        setProtein(e.target.value);
    };

    const changeToppings = (e) => {
        if (e.target.checked) {
            setToppings([...toppings, e.target.name]);
        } else {
            setToppings(toppings.filter(topping => topping !== e.target.name));
        }
    };

    const changeDressings = (e) => {
        if (e.target.checked) {
            setDressings([...dressings, e.target.name]);
        } else {
            setDressings(dressings.filter(dressing => dressing !== e.target.name));
        }
    };

    return (
        <div className='entree-mods' >
            <div className='selected-entree' >
                <label className='selected-entree-title' >Selected Entree</label>
                <Card
                    key={from.base}
                    sx={{
                        width: 300,
                        height: 200,
                        margin: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div className='item-info' >
                        <label>{from.base}</label>
                    </div>
                </Card>
            </div>
            <div className='main-panel' >
                <div className='selection-panel' >
                    <div className='protein-selection' >
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Protein</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                name="protein-radio-buttons"
                            >
                                <FormControlLabel value="Gyro" control={<Radio onClick={changeProtein} />} label="Gyro" />
                                <FormControlLabel value="Falafel" control={<Radio onClick={changeProtein} />} label="Falafel" />
                                <FormControlLabel value="Vegetable Medley" control={<Radio onClick={changeProtein} />} label="Vegetable Medley" />
                                <FormControlLabel value="Meatballs" control={<Radio onClick={changeProtein} />} label="Meatballs" />
                                <FormControlLabel value="Chicken" control={<Radio onClick={changeProtein} />} label="Chicken" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='toppings-selection' >
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">Toppings</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Pickled Onions" />
                                    }
                                    label="Pickled Onions"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Diced Cucumbers" />
                                    }
                                    label="Diced Cucumbers"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Citrus Couscous" />
                                    }
                                    label="Citrus Couscous"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Roasted Cauliflower" />
                                    }
                                    label="Roasted Cauliflower"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Tomato-Onion Salad" />
                                    }
                                    label="Tomato-Onion Salad"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Kalamata Olives" />
                                    }
                                    label="Kalamata Olives"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Roasted Peppers" />
                                    }
                                    label="Roasted Peppers"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeToppings} name="Red Cabbage Slaw" />
                                    }
                                    label="Red Cabbage Slaw"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div className='dressings-selection' >
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">Dressings</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Hummus" />
                                    }
                                    label="Hummus"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Red Pepper Hummus" />
                                    }
                                    label="Red Pepper Hummus"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Jalapeno Feta" />
                                    }
                                    label="Jalapeno Feta"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Tzaziki" />
                                    }
                                    label="Tzaziki"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Greek Vinaigrette" />
                                    }
                                    label="Greek Vinaigrette"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Harissa Yogurt" />
                                    }
                                    label="Harissa Yogurt"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Lemon Herb Tahini" />
                                    }
                                    label="Lemon Herb Tahini"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox onClick={changeDressings} name="Yogurt Dill" />
                                    }
                                    label="Yogurt Dill"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
                <div className='combo-and-submit' >
                    <div className='submit-button' >
                        <Link
                            to={{
                                pathname: '/selection'
                            }}
                            state={{
                                base: from.base,
                                bases: [...from.bases, {
                                    base: from.base,
                                    starters: from.starters,
                                    protein: protein,
                                    toppings: toppings.join(', '),
                                    dressings: dressings.join(', ')
                                }],
                                starters: from.starters,
                                protein: protein,
                                toppings: toppings,
                                dressings: dressings,
                                combo: from.combo,
                                cartItemsArr: [...from.cartItemsArr, [{
                                    base: from.base,
                                    starters: from.starters,
                                    protein: from.protein,
                                    toppings: toppings.join(', '),
                                    dressings: dressings.join(', '),
                                }]]
                            }}
                        >
                            <Button sx={{backgroundColor: 'transparent', width: '120%'}} variant='outlined' margin='normal' >
                                Submit
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntreeMods;