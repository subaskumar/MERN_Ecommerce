import * as React from 'react';

import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';


import NavBar from '../NavBar/navBar';


export default function Home(props) {
  const [datas,setData] = useState({products:[]})

    useEffect(() => {
        Axios.get("http://localhost:7000/api/product/getProducts")
        .then((res) => {
            setData(res.data)
            })            // by using this we capture data whatever comming , and comming  data is Javascript Object
      },[] );
      console.log(datas.products)

  return (
    <>
      <NavBar>
   
      {datas.products.map((prd) => (       
        <Card sx={{ maxWidth: 250,minWidth: 250, m: 2, textDecoration: 'none' }} key={prd._id} component={Link} to={`/product/${prd._id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={prd.productPictures[0]}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {prd.name}
              </Typography>
              <Typography variant="body2" variant="p" >
                Description : {prd.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span>Price : {prd.price} </span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </NavBar>
  </>
  )
}
