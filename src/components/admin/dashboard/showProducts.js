import { DashboardContent } from './Dashboard'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';


const ShowProducts = () => {
    const navigate = useNavigate();

    const [datas,setData] = useState({products:[]})

    useEffect(() => {
        Axios.get("http://localhost:7000/api/product/getProducts")
        .then((res) => {
            setData(res.data)
            })            // by using this we capture data whatever comming , and comming  data is Javascript Object
      },[] );
      console.log(datas.products)

      const deleteProduct = (id) =>{
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        Axios.delete(`http://localhost:7000/api/product/${id}/`,{headers: headers})
        .then((res) => window.location.reload())

      }
    return (
        <>
            <DashboardContent >
            <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title>Recent Orders</Title>
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
                            <TableCell align="right">
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>deleteProduct(`${row._id}`)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
                </Grid>
              </Grid> 
            </DashboardContent>
        </>
        
    )
}
export default ShowProducts;