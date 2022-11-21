import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import './css/CustomerSelect.css';

const bases = ['Grain Bowl', 'Salad', 'Pita', 'Greens and Grains', 'hhhhhh', 'uiuihhuh', 'fdfddffd', 'sdsfsf', 'afafefef', 'sfsfsfsf'];
const starters = ['2 Falafels', 'Hummus and Pita', 'Vegan Box', 'Garlic Fries', 'hhhhhh', 'uiuihhuh', 'fdfddffd', 'sdsfsf', 'afafefef', 'sfsfsfsf'];

const CustomerSelect = () => {

    const location = useLocation();
    let from = null;
    if (location.state !== null) {
        from = location.state;
    } else {
        from = {
            base: '',
            starter: '',
            toppings: [],
            dressings: [],
            combo: false
        }
    }

    const [ mealType, setMealType ] = useState("Starters");
    const [ menuItems, setMenuItems ] = useState(null);
    const [ starter, setStarter ] = useState('');
    const [ base, setBase ] = useState('');
    const [ toppings, setToppings ] = useState('');
    const [ dressings, setDressings ] = useState('');
    const [ cost, setCost ] = useState("");
    const [ basePage, setBasePage ] = useState(1);
    const [ starterPage, setStarterPage ] = useState(1);
    const [ totalBasePages, setTotalBasePages ] = useState(Math.ceil(bases.length / 4));
    const [ totalStarterPages, setTotalStarterPages ] = useState(Math.ceil(starters.length / 4));
    const [ basePages, setBasePages ] = useState([]);
    const [ starterPages, setStarterPages ] = useState([]);
    const [ mealsDisplaying, setMealsDisplaying ] = useState(false);

    const changeMealType = (e) => {
        if (e.target.value === "Starters") {
            setMealType("Starters");
            if (mealsDisplaying === false) {
                showMenuItems();
                setMealsDisplaying(true);
            }
        } else {
            setMealType("Entrees");
        }
    };

    const changeBase = (e) => {
        setBase(e.target.value);
    };

    const changeStarter = (e) => {
        setStarter(e.target.value);
    };

    const changeBasePage = (e) => {
        setBasePage(parseInt(e.target.innerHTML[0]));
    };

    const changeStarterPage = (e) => {
        setStarterPage(parseInt(e.target.innerHTML[0]));
    };

    const showMenuItems = () => {
        let items = null;

        if (mealType === "Starters") {
            items = (
                <div className='items' >
                    {(starterPages.length === 0) ? null : starterPages[starterPage - 1].map(starter => {
                        return (
                            <Card
                                key={starter}
                                sx={{
                                    width: 300,
                                    height: 200,
                                    margin: 2,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div className='item-info' >
                                    <label>{starter}</label>
                                    <Button value={starter} onClick={changeStarter} >Order</Button>
                                </div>
                            </Card>
                        )
                    })}
                    {(starterPages.length === 0) ? null : 
                        <Pagination hidePrevButton={true} hideNextButton={true} count={totalStarterPages} page={starterPage} 
                            onChange={changeStarterPage} color="primary" />
                    }
                </div>
            );
        } else {
            items = (
                <div className='items' >
                    {(basePages.length === 0) ? null : basePages[basePage - 1].map(base => {
                        return (
                            <Card
                                key={base}
                                sx={{
                                    width: 300,
                                    height: 200,
                                    margin: 2,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div className='item-info' >
                                    <label>{base}</label>
                                    <Link
                                        to={{
                                            pathname: '/selection/entree',
                                        }}
                                        state={{
                                            base: base,
                                            starter: starter
                                        }}
                                    >
                                        <Button value={base} onClick={changeBase} >
                                            Order
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        )
                    })}
                    {(basePages.length === 0) ? null : <Pagination hidePrevButton={true} hideNextButton={true} count={totalBasePages} page={basePage} 
                        onChange={changeBasePage} color="primary" />
                    }
                </div>
            );
        }

        setMenuItems(items);
    };

    useEffect(() => {
        if (typeof from.starter !== 'undefined') {
            setStarter(from.starter);
        }
        if (typeof from.toppings !== 'undefined') {
            setToppings(from.toppings.join(', '));
        }
        if (typeof from.dressings !== 'undefined') {
            setDressings(from.dressings.join(', '));
        }
    }, [location.state]);

    useEffect(() => {
        showMenuItems();
    }, [mealType, basePage, starterPage]);

    useEffect(() => {
        var arrayOfArrays = [];
        for (let i = 0; i < bases.length; i += 4) {
            arrayOfArrays.push(bases.slice(i, i + 4));
            setBasePages(arrayOfArrays);
        }
        arrayOfArrays = [];
        for (let i = 0; i < starters.length; i += 4) {
            arrayOfArrays.push(starters.slice(i, i + 4));
            setStarterPages(arrayOfArrays);
        }
    }, []);

    return (
        <div className='customer-select' >
            <div className='not-cart' >
                <label className='page-title' >Select Meal</label>
                <div className='meal-buttons' >
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button value='Starters' onClick={changeMealType} >Starters</Button>
                        <Button value='Entrees' onClick={changeMealType} >Entrees</Button>
                    </ButtonGroup>
                </div>
                {menuItems}
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
                    <label className='cart-title' >Cart</label>
                    {starter !== '' ?
                        <Card
                            sx = {{
                                width: 300,
                                height: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                                marginLeft: 16,
                                backgroundColor: '#F5FFFA'
                            }}    
                        >
                            <label>{starter}</label>
                        </Card> : null
                    }
                    {from.base !== '' ? 
                        <Card
                            sx = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 300,
                                height: 250,
                                marginTop: 5,
                                marginLeft: 16,
                                backgroundColor: '#F5FFFA'
                            }}    
                        >
                            <label>Base: {from.base}</label>
                            <label>Protein: {from.protein}</label>
                            {toppings !== '' ?
                                <label>Toppings: {toppings}</label> : <label>Toppings: None</label>
                            }
                            {dressings !== '' ?
                                <label>Dressings: {dressings}</label> : <label>Dressings: None</label>
                            }

                        </Card> : null
                    }
                    {from.combo === true ?
                        <label>+ Combo</label> : null
                    }
                </Card>
                <label className='order-total' >Order Total: {cost}</label>
                <div className='submit-button' >
                        <Link
                            to={{
                                pathname: '/checkout'
                            }}
                            state={{
                                starter: starter,
                                entree: {
                                    base: from.base,
                                    protein: from.protein,
                                    toppings: toppings,
                                    dressings: dressings,
                                    combo: from.combo,
                                },
                                cost: cost
                            }}
                        >
                            <Button sx={{backgroundColor: 'white', width: '120%'}} variant='outlined' margin='normal' >
                                Submit
                            </Button>
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerSelect;