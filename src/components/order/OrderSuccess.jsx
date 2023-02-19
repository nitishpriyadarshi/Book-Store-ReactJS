import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import orderSuccess from '../../assets/ordersuccess1.png'
import OrderService from '../../services/OrderService';

const OrderSuccess = () => {
    const [orders, setOrders] = useState([]);
    const [orderId , setOrderId]= useState('');
    const [userId , setUserId]= useState('');


    const fetchOrderData =()=>{
        OrderService.getOrdersByUserId(localStorage.getItem("userId")).then( response =>{
            console.log(response.data.data);
         
         
                setOrders(response.data.data);
                setOrderId(response.data.data.length);          
        })    
    }

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        fetchOrderData();
    },([]));

    
        return (
            <div>
                <Container>
                
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                sx={{ width:'100%', marginTop:'10px' }}> 
                    <img width='300px'  src={orderSuccess}></img>
                    <Typography variant='h4' sx={{marginTop:'2px'}}>
                        Order Placed Successfully
                    </Typography>
                    <center>
                    <Typography variant='body1' sx={{marginTop:'10px'}}>
                    hurray!!! your order is confirmed <br/>
                    the order id is # {orderId} save the order id for further communication.
                    </Typography>
                    </center>
    
                    <Button variant='contained' component={Link} to='/home' sx={{marginTop:'30px'}}>
                        Continue Shopping
                    </Button>
                    
                </Box>
                </Container>
            </div>
        );
    }


export default OrderSuccess;
