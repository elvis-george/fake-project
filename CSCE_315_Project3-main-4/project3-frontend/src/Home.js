import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Iframe from "react-iframe";
import './css/Home.css';



import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];

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
                <p className='home-text' > 
                  Pom & Honey is the best restaurant in College Station!
                </p>
                <div className='order-button' >
                    <Link
                        to={{
                            pathname: '/selection'
                        }}
                    >
                        <Button color= "secondary" variant="contained" size="large" >
                            Order Here
                        </Button>
                    </Link>
                </div>
            </div>
           
            <div className = 'picture-quilt'>
                <ImageList
                                            sx={{ width: 500, height: 450 }}
                                            variant="quilted"
                                            cols={4}
                                            gap = {10}
                                            rowHeight={121}
                                            center = {true}
                                            >
                                            {itemData.map((item) => (
                                                <ImageListItem  center = {true} key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                                <img
                                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                                    alt={item.title}
                                                    loading="lazy"
                                                />
                                                </ImageListItem>
                                            ))}
                 </ImageList>
            </div>
            <div id='home-divider' >
                <hr />
            </div>
            <div className='about-main' >
                <label id='about-title' > LOCATION</label>
                
                {map}
            </div>

           
        
        </div>
    ); 
};

export default Home;