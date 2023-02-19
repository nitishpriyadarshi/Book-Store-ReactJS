import React, { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import CartService from '../../services/CartService';
import { TextareaAutosize, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OrderService from '../../services/OrderService';
import "./Cart.css";
import Header from "../Header"
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const AddCart = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
     const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [landmark, setLandmark] = useState("");
     const [addressType, setAddressType] = useState("");
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
   
    

    const fetchCartItems = () => {
       

        CartService.getCartItemsByUserId(localStorage.getItem("userId")).then(response => {
            console.log(response.data.data)
            setCartItems(response.data.data)
        
             if(response.data.data){
                
                    setFirstName(response.data.data[0].user.firstName);
                    setLastName(response.data.data[0].user.lastName);    
                    setContactNo(response.data.data[0].user.phoneNumber);
                    setZip(response.data.data[0].user.zip);
                }
            })
        }

        const onValueChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        
        })
    }


    useEffect(() => {
        fetchCartItems();
    },([]));

    const handleNext = () => {

        if (activeStep < 3) {
        
                setActiveStep(activeStep + 1);
           
        }
    };
    const handleNextCheckCartisEmpty = () => {
        if (cartItems.length > 0){
            if (activeStep < 3) {
                setActiveStep(activeStep + 1);
                var total=0;
                {cartItems.map((item) => (
                    total=total + item.totalPrice
                    ));   
                }
                setTotalOrderPrice(total);
            } 
        }
        else {
            toast.info("Cart is Empty" , {
                position:"top-center"
            });
            
        }
    }

    const handleBack = () => {

        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const updateQuantity = (e, cartId) => {
        let quantity = e.target.value;
        CartService.updateCartQuantity(cartId, quantity).then((response) => {
            window.location.reload();
        });
    };

    const removeItemFromCart = (cartId) => {
        CartService.deleteCartItem(cartId).then((response) => {
            toast.success("cart item removed successfully!!" , {
                position:"top-center"
            });
            window.location.reload();
        });
    };


    const order = () => {
        ;
        let object = {
            
            address: address
        }
        console.log(object);
       
        OrderService.placeOrder(localStorage.getItem('userId'), object).then((response) => {
            console.log(response);
            toast.success("OrderPlaced Successfully" , {
                position:"top-center"
            });
        });
        navigate("/ordersuccess");
    }
    


        return (

            <div>
                <div className='head'><Header/></div>
                {cartItems == null ? (
                    <Container>
                        <Typography variant='h6'>
                            Cart is empty!!!
                        </Typography>
                    </Container>
                ) : (

                    <Container>
                        <Stepper activeStep={activeStep} orientation='vertical'>
                            <Step>
                                <StepLabel> Cart Items ({cartItems.length}) </StepLabel>

                                <StepContent>

                                    {cartItems.map((item) => (
                                        <>
                                            <Box
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '50ch', },
                                                    paddingLeft: '10px',
                                                    marginBottom: '10px'
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                display='flex'
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="left">

                                                <CancelIcon sx={{ marginRight: '20px' }} onClick={() => removeItemFromCart(item.cartId)} />

                                                <img height='100px' width='65px'
                                                    src={item.book.bookImg}>
                                                </img>

                                                <Box
                                                    sx={{ marginLeft: '15px' }}
                                                    display='flex'
                                                    flexDirection="column"
                                                >
                                                    <Typography variant='body1'>
                                                        {item.book.bookName}
                                                    </Typography>
                                                    <Typography variant='caption'>
                                                        by {item.book.authorName}
                                                    </Typography>
                                                    <Typography variant='body1'>
                                                        Total Rs. {item.totalPrice}
                                                    </Typography>

                                                    <div className="cart_quantity">

                                                        <label htmlFor="#"> QTY: </label>
                                                        <input
                                                            className="quantity_text"
                                                            type="text"
                                                            defaultValue={item.quantity}
                                                            onChange={(e) => updateQuantity(e, item.cartId)}
                                                        />
                                                    </div>

                                                </Box>
                                            </Box>
                                        </>
                                    ))}


                                    <Button variant='contained' onClick={handleNextCheckCartisEmpty} sx={{ marginLeft: '35%' }}>Continue</Button>

                                </StepContent>

                            </Step>
                            <Step>
                                <StepLabel> Customer Details </StepLabel>
                                <StepContent>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '30ch', },
                                        }}

                                        display='flex'
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="left"
                                    >
                                        <form className='registerBox'>
                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                            >

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    type={'text'}
                                                    name="firstName"
                                                    onChange={onValueChange}
                                                    value={firstName}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Last Name"
                                                    type="text"
                                                    required
                                                    name="lastName"
                                                    onChange={onValueChange}
                                                    value={lastName}
                                                />

                                            </Box>

                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                                whiteSpace={2}>

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Phone Number"
                                                    type='tel'
                                                    name="contactNo"
                                                    onChange={onValueChange}
                                                    value={contactNo}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Pincode"
                                                    type="number"
                                                    required
                                                    name="zip"
                                                    onChange={onValueChange}
                                                    value={zip}
                                                />

                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'

                                            >
                                                <TextareaAutosize
                                                    required
                                                    aria-label="Address"
                                                    lable="Address"
                                                    minRows={3}
                                                    placeholder="Address"
                                                    name='address'
                                                    style={{ width: '100%' }}
                                                    onChange={onValueChange}
                                                />
                                            </Box>

                                            <Box sx={{}}
                                                display='flex'
                                                flexDirection='row'
                                            >

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="City/Town"
                                                    type='text'
                                                    name="city"
                                                    onChange={onValueChange}
                                                />

                                                <TextField
                                                    id="outlined"
                                                    label="Landmark"
                                                    type="text"
                                                    required
                                                    name="landmark"
                                                    onChange={onValueChange}
                                                />

                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'
                                            >
                                                <FormControl>
                                                    <FormLabel id="addressType">Address Type</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="addressType"
                                                        name="addressType"
                                                        onChange={onValueChange}
                                                    >
                                                        <FormControlLabel value="home" control={<Radio />} label="Home" />
                                                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />

                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>

                                            <Box sx={{ mx: '8px' }}
                                                display='flex'
                                                flexDirection='row'
                                                justifyContent='right'
                                            >
                                                <Button variant='contained' onClick={handleNext} size='small'>Continue</Button>
                                                <Button variant='text' onClick={handleBack}>Back</Button>
                                            </Box>


                                        </form>
                                    </Box>




                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel> Order Summary </StepLabel>
                                <StepContent>
                                    {cartItems.map(item => (
                                        <>
                                            <Box
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '50ch', },
                                                    paddingLeft: '10px',
                                                    margin: '5px'
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                display='flex'
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <img height='100px' width='65px'
                                                    src={item.book.bookImg}
                                                ></img>
                                                {/* className="card-image"
                                                style={{ height: '140px', width: '200px' }}
                                                src={item.book.bookImg}
                                                alt="bookImg" */}
                                                <Box
                                                    sx={{ marginLeft: '15px' }}
                                                    display='flex'
                                                    flexDirection="column"
                                                >
                                                    <Typography variant='body1'>
                                                        {item.book.bookName}
                                                    </Typography>
                                                    <Typography variant='caption'>
                                                        by {item.book.authorName}
                                                    </Typography>
                                                    <Typography variant='body1'>
                                                        Total Price Rs. {item.totalPrice}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ))}

                                    <div>
                                    <h3>
                                        Total Order Price {totalOrderPrice}
                                    </h3>
                                    </div>

                                    <Button variant='contained' sx={{ marginLeft: '35%' }} onClick={order} size='small'>Place Order</Button>
                                    <Button variant='text' onClick={handleBack}>Back</Button>
                                </StepContent>
                            </Step>
                        </Stepper>

                    </Container>

                )}
                <ToastContainer/>
            </div>
        );
    }

export default AddCart;