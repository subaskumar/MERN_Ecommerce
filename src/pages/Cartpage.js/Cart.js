import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/navBar';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';


const Cart= () => {
    const token = localStorage.getItem('token')
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }

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
            <Grid container spacing={3}>
            <Card sx={{ maxWidth: 1050,minWidth: 1050, m: 'auto', textDecoration: 'none' }}  >
                <CardActionArea>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Picture</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            {/* <TableCell align="right">Sale Amount</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {datas.products.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><img style={{width: '50px', height: '45px'}} src={row.productPictures[0]} /></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Paper>
                </CardActionArea>

            </Card>
            </Grid>
        </NavBar>

        </>
        
    )
}
export default Cart;