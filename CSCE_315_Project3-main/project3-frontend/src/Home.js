import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Iframe from "react-iframe";
import './css/Home.css';

const Home = () => {

    const [ map, setMap ] = useState(null);

    const loadMap = async () => {
        setMap(
            <Iframe
                width="600"
                height="450"
                style="border:0"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAFu3IGZFTq7doRGvnvbUTQV4PmfDY51cc
                    &q=Pom+%26+Honey+-+MSC"
            />
        );
    };

    useEffect(() => {
        loadMap();
    }, []);

    return (
        <div className='home' >
            <div className='home-main' >
                <label className='home-label' >Pom & Honey</label>
                <p className='home-text' >Bacon ipsum dolor amet fatback pancetta kielbasa beef buffalo prosciutto. Tail ground round cupim pork belly chislic. Boudin filet mignon doner turkey. Chicken bresaola tongue bacon turkey, tail biltong pancetta turducken. Short ribs kielbasa chislic, tongue meatball biltong t-bone corned beef beef pork short loin drumstick chuck chicken meatloaf.
Shankle cow pork chop kevin buffalo ribeye salami venison sausage frankfurter pork short ribs doner brisket. Sausage beef short ribs venison boudin burgdoggen ham t-bone alcatra tri-tip swine pork belly meatloaf rump landjaeger. Shankle ball tip pork, alcatra prosciutto short ribs beef ribs. Alcatra jerky beef tri-tip cow strip steak leberkas chicken short loin. Filet mignon alcatra pork pork belly meatloaf, rump spare ribs chicken jowl brisket kevin. Pancetta pork belly kielbasa hamburger cow drumstick prosciutto tail chislic sirloin ribeye bacon meatloaf. Pancetta t-bone pastrami biltong landjaeger, porchetta andouille swine chicken sirloin chislic.
Pastrami ball tip pig, picanha fatback sirloin ham sausage kielbasa pork loin. Shank cow ham hock, cupim ribeye brisket kielbasa leberkas pork belly beef salami. Meatloaf short ribs turkey, chuck andouille biltong buffalo picanha doner t-bone flank. Tri-tip leberkas pork chop jerky cow pig buffalo bacon ribeye spare ribs. Bresaola ham meatloaf, sirloin tongue short ribs turducken frankfurter pork loin pancetta buffalo turkey. Cupim ham pancetta, pork chop pastrami short ribs meatloaf pork belly tri-tip drumstick. Turkey chuck landjaeger, hamburger leberkas frankfurter salami capicola.
Chicken strip steak ham, cow beef ribs tongue pork chop chuck ball tip corned beef spare ribs flank tail. Fatback prosciutto pastrami tenderloin, alcatra hamburger tail. Brisket cow ham hock shank t-bone. Shankle pig brisket pork beef. Beef ribs spare ribs porchetta, ham hock shank kielbasa pancetta swine short ribs. Ham hock hamburger swine, venison frankfurter sausage bresaola chislic ground round corned beef tri-tip bacon tail t-bone pancetta.
Filet mignon kielbasa pork pancetta. Tri-tip ground round jowl, landjaeger shankle salami beef chicken. Chuck salami strip steak turducken, picanha venison filet mignon tail pancetta porchetta pork belly ribeye kevin frankfurter. Bacon spare ribs tongue beef, tenderloin prosciutto doner ground round. Ham bacon pastrami andouille alcatra. Chislic leberkas bacon frankfurter tri-tip.
                </p>
                <div className='order-button' >
                    <Link
                        to={{
                            pathname: '/selection'
                        }}
                    >
                        <Button variant='outlined' margin='normal' >
                            Order Here
                        </Button>
                    </Link>
                </div>
            </div>
            <div id='home-divider' >
                <hr />
            </div>
            <div className='about-main' >
                <label id='about-title' >About</label>
                {map}
                <p id='about-text' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                      deserunt mollit anim id est laborum</p>
            </div>
        </div>
    ); 
};

export default Home;