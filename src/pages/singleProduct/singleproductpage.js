import NavBar from "../NavBar/navBar";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';


export default function SingleProduct() {
        const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)

    const [Pdata,setData] = useState({product : {}})

    useEffect(() => {
        Axios.get(`http://localhost:7000/api/product/${id}/`)
        .then((res) => setData(res.data));              // by using this we capture data whatever comming , and comming  data is Javascript Object
      },[id] );

      console.log(Pdata)
      const AddToCart = (productId) => {
          console.log(productId)
          const token = localStorage.getItem('token')
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }

        const ProductInfo = {ProductID : productId}

        Axios.patch(`http://localhost:7000/api/user/cart/addtocart`,ProductInfo,{headers: headers})
        .then((res) => {
            console.log("my response",res.data,"wait")
            navigate('/user/cart')
        })

      }

    return (
        <>
            <NavBar>
                <Card sx={{ maxWidth: 750,minWidth: 750, m: 'auto', textDecoration: 'none' }}  >
                <CardActionArea>

                    <CardMedia
                        component="img"
                        sx={{ maxWidth: 350,minWidth: 350, maxHeight : 300, p: 5,float: 'left'}}
                        image={Pdata.product.productPictures}
                        alt="green iguana"
                    />
                    <CardContent sx={{mt:5, ml: 10}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{mb: 2 }}>
                            {Pdata.product.name}
                        </Typography>
                        <Typography variant="body2" variant="p" sx={{ fontSize: '16px', mt: 10 }}>
                            Description : {Pdata.product.description}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', mt: 3 }} color="text.secondary">
                            <span>Price : {Pdata.product.price} </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '16px', mt: 3 }}>
                            <span>Available Quantity : {Pdata.product.quantity} </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px', mt: 7, fontWeight : 700 }}>
                            <Button variant="outlined" onClick={()=> AddToCart(`${Pdata.product._id}`)}>Add to Cart</Button>
                        </Typography>
                    </CardContent>
                </CardActionArea>

                </Card>
            </NavBar>
        </>
    )
}
