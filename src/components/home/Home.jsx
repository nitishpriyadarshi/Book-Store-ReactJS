import "./Home.css";
import cartIcon from '../../assets/cart9.png';
import registerIcon from '../../assets/register3.png'
import React, { useEffect , useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Menu } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import BookService from '../../services/BookService';
import CartService from '../../services/CartService'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [bookName, setBookName] = useState('');
    const [books, setBooks] = useState([]);
    const [cntMap, setCntMap] = useState(new Map());
    const [cartcount, setCartcount] = useState([]);

   
     
    
    const logout = () => {
        if (localStorage.length === 0) {
           navigate("/login");
        }
        else {
        localStorage.removeItem("firstName")
        localStorage.removeItem("userId")
        localStorage.removeItem("jwtToken");
        toast.success("User Logout Successfully.....!!!" , {
            position:"top-center"
        });
    }
}


    const fetchCartDetails = () => {
        CartService.getCartItemsByUserId().then((response) => {
            setCartcount(response.data.data)
        })
    }

    const fetchBooksData = () => {
        BookService.getAllBooks().then(response => {
            console.log(response.data.data);
            setBooks(response.data.data)
        })
    }


    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        fetchBooksData();
         fetchCartDetails();
    
    },([]));


    
    const addToCart = (bookId) => {
             
         setUserId(localStorage.getItem("userId"));
        let qnt = 1;
        let object = {
            "bookId": bookId,
            "quantity": qnt,
        }

    
       { CartService.addToCart(userId, object).then((response) => {
        toast.success("book added to the cart successfully!!!" , {
            position:"top-center"
        });
        }).catch(() => {
            toast.info("book already added in cart!", {
                position:"top-center"
            })
            
        });
    }
        window.location.reload();
        

    }

    const handleSort = (event) => {
        if (event.target.value === 1) {
            BookService.getAllBooksSortedByPriceAsc().then((response) => {
                setBooks(response.data.data)
            })
        } else {
            BookService.getAllBooksSortedByPriceDesc().then((response) => {
                setBooks(response.data.data)
            })
        }
    }

    const handlerSearch = (event) => {
        event.preventDefault();
        let search = event.target.value;
        console.log(search);
        BookService.searchByBookName(search).then((response) => {
            setBooks(response.data.data)                  
            }) 
            .catch((response) => {
                toast.info("Book Does Not Exist in Cart" , {
                    position:"top-center"
                });
            });
    };

    const cartcheck = () => {
    var cartSizes = cartcount.length;
        console.log(cartSizes)
    if (localStorage.length !== 0){
        if (cartSizes === 0){
            toast.info("Cart is Empty" , {
                position:"top-center"
            });
        }
        else {
            navigate("/mycart")
        }
    }
    else {
      navigate("/login");
    }
    };


    
        return (

            <div>
                <Header/>
                <header className="header">
                    <span className="cartcount">
                        [{cartcount.length}]
                    </span>

                    <div className="button-home">
                    <Button onClick={cartcheck} className='buttoncart'>
                            <img src={cartIcon}
                             height={45}
                            width={50}
                            alt="cartIcon"
                            className="login-image-homepage" ></img>
                    </Button>


                        <div>
                            <PopupState variant='popover' popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Box
                                            m={4}
                                            display='flex'
                                            justifyContent='flex-end'
                                        >
                                            <image variant="contained" style={{
                                                position: 'relative', bottom: 55, right: "-20%",
                                                transform: "translateX(20%)"
                                            }} {...bindTrigger(popupState)}>
                                                <img src={registerIcon}
                                                    height={40}
                                                    width={45}
                                                    alt="registerIcon"
                                                    className="reg-image-homepage" />
                                            </image>
                                        </Box>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem style={{ color: 'black' }}>MY ACCOUNT({localStorage.getItem('firstName')})</MenuItem>
                                            <Link to='/myorders' style={{ textDecoration: 'none', color: 'darkgoldenrod' }}><MenuItem onClick={popupState.close}>My Orders</MenuItem></Link>
                                            <Link to='/registration' style={{ textDecoration: 'none', color: 'darkgoldenrod' }}><MenuItem onClick={popupState.close}>{localStorage.getItem("userId") === null ? 'Register' : 'Update User'}</MenuItem></Link>
                                            <div style={{ textDecoration: 'none', color: 'darkgoldenrod' }}><MenuItem onClick={logout}>{localStorage.getItem("userId") === null ? 'Sign In' : 'Sign Out'}</MenuItem></div>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </div>

                    </div>
                </header>

                <Container >
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        sx={{ marginTop: '10px' }}>
                        <Typography gutterBottom variant="h5">
                            BOOKS[{books.length}]
                        </Typography>

                        <Box>
                            <input style={{ padding: '17px 5px 5px 5px', textAlign: 'center',margin:"0px 10px 0px 700px " }} onChange={handlerSearch} placeholder="search"></input>
                           
                        </Box>

                        <FormControl size='small' sx={{ width: '100px' }}>
                            <InputLabel id="sort">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="sort"
                                label="Sort"
                                name="sortBy"
                                onChange={handleSort}
                            >
                                <MenuItem value={1} >
                                    <Typography variant="caption">Price: Low to High</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography variant="caption" >Price: High to Low</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>

                    </Box>


                    <Box sx={{ flexGrow: 1, marginTop: '15px', marginBottom: '20px', padding: '25px', background: '#EFF5F5', boxShadow: '1px 2px 3px 2px grey', borderRadius: '20px' }}>

                        <Grid container spacing={2}>
                            {books.map(book => (
                                <Grid item xs={6} sm={4} md={4}>
                                    <Card sx={{ maxWidth: 300, boxShadow: ' 2px 3px grey', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px', paddingTop: '0px', marginBottom: '40px' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                style={{ objectFit: 'fill' }} //objectFit: 'contain'
                                                component="img"
                                                height="300"
                                                image={book.bookImg}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" >
                                                    {book.bookName}
                                                </Typography>
                                                <Typography variant="body1" display="block" gutterBottom>
                                                    by {book.authorName}
                                                </Typography>
                                                <Typography gutterBottom variant="body2" >
                                                    Rs. {book.price}
                                                </Typography>

                                                <Stack marginLeft='60px' direction='row'>
                                                { book.quantity === 0 ? <Button variant="contained" size='medium' color="info" disabled='true'>OUT OF STOCKS</Button> :     
                                                    <Button variant="contained" size='medium' color="warning" startIcon={<AddShoppingCartIcon />} onClick={() => addToCart(book.bookId)}>
                                                        <Typography variant="caption" >
                                                            Add to Cart
                                                        </Typography>
                                                    </Button>
                                                }                
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                            ))}



                        </Grid>
                    </Box>


                </Container>
                <ToastContainer/>

            </div>
        );
    }


export default Home;

