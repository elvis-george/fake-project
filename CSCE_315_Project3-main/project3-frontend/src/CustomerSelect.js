import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './css/CustomerSelect.css';

const baseList = ['Grain Bowl', 'Salad', 'Pita', 'Greens and Grains'];
const starterList = ['2 Falafels', 'Hummus and Pita', 'Vegan Box', 'Garlic Fries'];

/**
 * This function allows the user to select the menu items
 * @returns all the menu items selected by the user are displayed in the cart, next to the
 */
const CustomerSelect = () => {

    const location = useLocation();
    let from = null;
    if (location.state !== null) {
        from = location.state;
    } else {
        from = {
            base: '',
            protein: '',
            bases: [],
            starters: [],
            toppings: [],
            dressings: [],
            cartItemsArr: []
        }
    }

    const [ mealType, setMealType ] = useState("Starters");
    const [ menuItems, setMenuItems ] = useState(null);
    const [ cartItems, setCartItems ] = useState(null);
    const [ starters, setStarters ] = useState([]);
    const [ base, setBase ] = useState('');
    const [ bases, setBases ] = useState([]);
    const [ toppings, setToppings ] = useState('');
    const [ dressings, setDressings ] = useState('');
    const [ cost, setCost ] = useState("");
    const [ basePage, setBasePage ] = useState(1);
    const [ starterPage, setStarterPage ] = useState(1);
    const [ cartItemsPage, setCartItemsPage ] = useState(1);
    const [ totalBasePages, setTotalBasePages ] = useState(Math.ceil(baseList.length / 4));
    const [ totalStarterPages, setTotalStarterPages ] = useState(Math.ceil(starterList.length / 4));
    const [ basePages, setBasePages ] = useState([]);
    const [ starterPages, setStarterPages ] = useState([]);
    const [ mealsDisplaying, setMealsDisplaying ] = useState(false);
    const [ combo, setCombo ] = useState(false);

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

    const addStarter = (e) => {
        setStarters((starters.indexOf(e.target.value) < 0) ? [...starters, e.target.value] : [...starters]);
    };

    const changeBasePage = (e) => {
        setBasePage(parseInt(e.target.innerHTML[0]));
    };

    const changeStarterPage = (e) => {
        setStarterPage(parseInt(e.target.innerHTML[0]));
    };

    const changeCartItemsPage = (e) => {
        setCartItemsPage(parseInt(e.target.innerHTML[0]));
    };

    const changeCombo = (e) => {
        if (e.target.checked) {
            setCombo(true);
        } else {
            setCombo(false);
        }
    };

    const showMenuItems = () => {
        let items = null;

        if (mealType === "Starters") {
            items = (
                <div className='items-page' >
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
                                        flexDirection: 'column',
                                        backgroundColor: '#FFFAF0'
                                    }}
                                >
                                    <div className='item-info' >
                                        <label>{starter}</label>
                                        <Button value={starter} onClick={addStarter} >Order</Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                    {(starterPages.length === 0) ? null : 
                        <Pagination hidePrevButton={true} hideNextButton={true} count={totalStarterPages} page={starterPage} 
                            onChange={changeStarterPage} color="primary" />
                    }
            </div>
            );
        } else {
            items = (
                <div className='items-page' >
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
                                        flexDirection: 'column',
                                        backgroundColor: '#FFFAF0'
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
                                                bases: bases,
                                                cartItemsArr: [...starters, ...bases],
                                                starters: starters,
                                                combo: combo
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
                    </div>
                    {(basePages.length === 0) ? null : <Pagination hidePrevButton={true} hideNextButton={true} count={totalBasePages} page={basePage} 
                        onChange={changeBasePage} color="primary" />
                    }
                </div>
            );
        }

        setMenuItems(items);
    };

    const showCartItems = () => {
        let cartItemsArrCopy = [...starters, ...bases];
        let items = null;
        let arrayOfArrays = [];
        let cartItemsPages = [];
        for (let i = 0; i < cartItemsArrCopy.length; i += 2) {
            arrayOfArrays.push(cartItemsArrCopy.slice(i, i + 2));
        }

        cartItemsPages = arrayOfArrays;
        console.log(cartItemsPages)

        if (cartItemsPages.length > 0) {
            items = (cartItemsPages[cartItemsPage - 1].map((item) => {
                if (item.base === undefined) {
                    return (<Card
                        sx = {{
                            width: 300,
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5,
                            backgroundColor: '#FFFAF0'
                        }}    
                    >
                        <label>{item}</label>
                    </Card>);
                } else {
                    return (<Card
                        sx = {{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 180,
                            marginTop: 5,
                            backgroundColor: '#FFFAF0'
                        }}    
                    >
                        <label>Base: {item.base}</label>
                        <label>Protein: {item.protein}</label>
                        {item.toppings !== '' ?
                            <label>Toppings: {item.toppings}</label> : <label>Toppings: None</label>
                        }
                        {item.dressings !== '' ?
                            <label>Dressings: {item.dressings}</label> : <label>Dressings: None</label>
                        }
                    </Card>);
                }
            }));
        }

        setCartItems(
            <div className='cart-items' >
                {items}
                <div className='cart-pagination' >
                    {(cartItemsPages.length === 0) ? null : <Pagination hidePrevButton={true} hideNextButton={true} count={cartItemsPages.length} page={cartItemsPage} 
                        onChange={changeCartItemsPage} color="primary" />
                    }
                </div>
            </div>
        );
    };

    useEffect(() => {
        console.log(from);
        
        if (typeof from.starters !== 'undefined') {
            setStarters(from.starters);
            setBases([...from.bases]);
            setCombo(from.combo);
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
        showMenuItems();
    }, [starters]);

    useEffect(() => {
        showCartItems();
    }, [starters, bases, cartItemsPage]);

    useEffect(() => {
        var arrayOfArrays = [];
        for (let i = 0; i < baseList.length; i += 4) {
            arrayOfArrays.push(baseList.slice(i, i + 4));
            setBasePages(arrayOfArrays);
        }
        arrayOfArrays = [];
        for (let i = 0; i < starterList.length; i += 4) {
            arrayOfArrays.push(starterList.slice(i, i + 4));
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
                    <div className='cart-top' >
                        <label className='cart-title' >Cart</label>
                        <div className='combo-check' >
                            <FormControlLabel
                                control={
                                    <Checkbox checked={combo} onClick={changeCombo} name="Combo" />
                                }
                                label="Combo?"
                            />
                        </div>
                    </div>
                    {cartItems}
                    {combo === true ?
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
                                cartItems: [...starters, ...bases],
                                bases: bases,
                                starters: starters,
                                cost: cost,
                                combo: combo
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