import { DashboardContent } from './Dashboard'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import Container from '@material-ui/core/Container';
import {useEffect, useState} from "react"
import Axios from 'axios'
import {useNavigate} from 'react-router-dom';




const ProductAdd = () =>{
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photos, setPicture] = useState([])

    const ProductSubmit = (e) => {
        e.preventDefault();
        const inputProduct = new FormData()
        inputProduct.append('name',name);
        inputProduct.append('price',price);
        inputProduct.append('description',description);
        inputProduct.append('quantity',quantity);

        // for (let pic of photos) {
        //     inputProduct.append("photos", pic);
        //   }
        inputProduct.append('photos',photos,photos.name);
        console.log(inputProduct)

        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }

        Axios.post("http://localhost:7000/api/product/create", inputProduct,{headers: headers})
        .then((res) => navigate('/admin/product'))
        .catch(function(error){
                if(error.response){
                    console.log(error.message);
                    console.log(error.response);
    
        }
    })
}

    return (
        <>
            <DashboardContent >
                <Box component="form" onSubmit={ProductSubmit}  sx={{'& > :not(style)': {ml:7,mt:5, width: '35ch' },}} noValidate autoComplete="off" >
                    <TextField  id="standard-basic" label="Name" name="name" variant="standard" onChange={(e)=> setName(e.target.value)} value={name} required/>
                    <TextField type="number" id="standard-basic" label="Price" name="price" variant="standard" onChange={(e)=> setPrice(e.target.value)} value={price}required />
                    <TextField id="standard-basic" label="Description" name="description" variant="standard" onChange={(e)=> setDescription(e.target.value)} value={description} required />
                    <TextField type="number" id="standard-basic" name="quantity" label="Quantity" variant="standard" onChange={(e)=> setQuantity(e.target.value)} value={quantity} required />
                    <input id="formPic" type="file" name='photos' multiple onChange={(e)=> setPicture(e.target.files[0])} required />
                    <div>
                        <Button sx={{ml:0,width: '20ch'}} type='submit' variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                        
                </Box>
                
            </DashboardContent>
        </>
    )
}

export default ProductAdd;


