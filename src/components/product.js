import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { CardActionArea } from '@mui/material';
import "../style/product.css";
import AddIcon from '@mui/icons-material/Add';
import ResimYok from "../img/resim-yok.jpg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link,useParams } from 'react-router-dom';

function Product({productID, productImage, productTitle, productPrice, productStok, onClick, isLoading,position }) {
    const [stock, setStock] = useState(false);
    const [noStock, setNoStock] = useState(false);
    const [id,setID] = useState("");

    const { masaId } = useParams();


    const [values,setValues] = useState({
        masaID: masaId,
        siparis:productID,
        adet:1
      })
    const successToast = () => {
        toast.success('Product is added your cart !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    } 
    
    const errorToast = () => {
        toast.error('This product is not in our stock today !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }  

    const addCart = () => {
        if (stock > 0) {  
            successToast();
            axios.post("https://serverdeneme-p4tc.onrender.com/sendToCart", values)
                .then(res => {
                })
                .catch(err => console.log(err));
                
        }
        else{
            errorToast();
        }
    }

    useEffect(() => {
        if (productStok) {
            productStok()
                .then((stockValue) => {
                    setStock(stockValue);
                })
                .catch((error) => {
                    console.error(error);
                    setStock(null);
                });
        }
    }, [productStok]);

    useEffect(() => {
        if (stock === "0") {
            setNoStock(true);
        }
    }, [stock]);

    return (
        <div className="product-container">
            <div className="product-card">
                <Card sx={{ width: 160, height: 160, borderRadius: 5, backgroundColor: stock===0 || noStock ? "#f5f5f5" : "white" }} className={stock===0 || noStock ? "outOfStock" : ""}>
            <CardActionArea onClick={onClick}>
                {isLoading ? (
                    <Skeleton variant="rectangular" width={170} height={80} />
                ) : (
                    <>
                        <CardMedia
                            component="img"
                            height="80"
                            image={productImage === null ? ResimYok : `https://serverdeneme-p4tc.onrender.com/images/` + productImage}
                            style={stock===0 || noStock ? { filter: 'grayscale(100%)' } : {}}
                            className='animate__animated animate__heartBeat'
                        />
                        {stock===0 || noStock ? 
                        <div className='stokYok animate__animated animate__jackInTheBox'>
                            <h6 className='stokYokText'>Stok Yok</h6>
                        </div>
                        : (
                            <div className='stokArea animate__animated animate__jackInTheBox'>
                                <h6 className="stokText">
                                    {`Stok: ${stock}`}
                                </h6>
                            </div>
                        )}
                        
                    </>
                )}
                <CardContent>
                    
                        {isLoading ? (
                            <React.Fragment>
                                <Skeleton variant="text" width={100} />
                                <Skeleton variant="text" width={80} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography gutterBottom variant="h6" component="div" className={`componentTitle ${stock===0 || noStock ? 'outOfStockText' : ''}` + "animate__animated animate__zoomIn"}>
                                    {productTitle}
                                </Typography>
                                <Typography variant="h6" className={`priceText ${stock===0 || noStock ? 'outOfStockText' : ''}`+ "animate__animated animate__zoomIn"}>
                                    {productPrice} TL
                                </Typography>
                            </React.Fragment>
                        )}
                        
                    
                </CardContent>
            </CardActionArea>
                </Card>
            </div>
            <div  className={`add-cart-button ${position}-button`} >
                <button onClick={addCart} className='addCart btn btn-primary animate__animated animate__heartBeat' style={{backgroundColor: stock===0 || noStock ? "#f5f5f5" : "#4477CE", color: stock===0 || noStock ? "#454545" : "white", borderColor: stock===0 || noStock ? "#f5f5f5" : "#4477CE"}} ><AddIcon/></button>
            </div>  
            <ToastContainer />          
    </div>
    );
}

export default Product;
