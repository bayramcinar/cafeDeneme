import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/orders.css"
import table from "../img/chair.png";
import "../style/tables.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderPrice, setOrderPrice] = useState([]);
    
    const [ordersComplated, setOrdersComplated] = useState([]);
    const [orderPriceComplated, setOrderPriceComplated] = useState([]);

    const succesToast = () => {
        toast.success('The order deleted succesfully !', {
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


    useEffect(() => { 
        axios.get("http://localhost:8081/getCartAdmin")
          .then(res => {
            setOrders(res.data.mergedOrders); 
            setOrderPrice(res.data.totalToplamByMasa);
          })
          .catch(err => console.log(err))
    },[orders]);  

    useEffect(() => { 
        axios.get("http://localhost:8081/getCartAdminComplated")
          .then(res => {
            setOrdersComplated(res.data.mergedOrders); 
            setOrderPriceComplated(res.data.totalToplamByMasa);
          })
          .catch(err => console.log(err))
    });  

      
    const deleteTableOrder = (masaID) =>{
        axios.delete(`http://localhost:8081/silCartAdmin/${masaID}`)
        .then(res => {
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:8081/getCartAdmin")
            .then(res => {
              setOrders(res.data.mergedOrders); 
              setOrderPrice(res.data.totalToplamByMasa);
            })
        .catch(err => console.log(err))
        succesToast();
    }

    const deleteComplatedTableOrder = (masaID) =>{
        axios.delete(`http://localhost:8081/silCartAdminComplated/${masaID}`)
        .then(res => {
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:8081/getCartAdminComplated")
            .then(res => {
              setOrdersComplated(res.data.mergedOrders); 
              setOrderPriceComplated(res.data.totalToplamByMasa);
            })
        .catch(err => console.log(err))
        succesToast();
    }

    const complateOrder = (masaID) => {
        axios.get(`http://localhost:8081/getCartAdminByOne/${masaID}`)
          .then(res => {
            const completedOrders = [];
            
            res.data.mergedOrders.forEach(order => {
              order.orders.forEach(product => {
                completedOrders.push({
                  masaID: order.masaID,
                  siparis: product.id,
                  adet: product.adet
                });
              });
            });
    
            console.log(masaID);
    
            completedOrders.forEach(completedOrder => {
              axios.post("http://localhost:8081/sendToComplatedOrders", completedOrder)
                .then(res => {
                })
                .catch(err => console.log(err));
            });
    
            axios.delete(`http://localhost:8081/silCartAdmin/${masaID}`)
            .then(res => {
            })
            .catch(err => console.log(err))

            axios.get("http://localhost:8081/getCartAdmin")
            .then(res => {
              setOrders(res.data.mergedOrders); 
              setOrderPrice(res.data.totalToplamByMasa);
            })
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err));
    }
    
    
    function formatDate(rawDate) {
        const date = new Date(rawDate);
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
    
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    }
    
      
      

    return (
        <div className='orderList'>
            <div className='row'>
                <div className='col-lg-6 col-sm-12'>
                    <h1 className='orderColTitle'>New Orders (Total: {orders.length})</h1>
                    <div className='complatedOrdersArea'>
                    {orders.map((orderGroup, index) => (
                    <div className='orderContainer col-12 mb-4' key={index}>
                        <div className='row'>
                            <div className='masaNumarasi col-4'>
                            <div className='tableBox'>
                                <div className='row genelBox'>
                                <div className='col-6'>
                                    <img className='tableIcon' src={table} />
                                </div>
                                <div className='col-3'>
                                    <h5 className='tableNumber'>{orderGroup.masaID}</h5>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className='orders col-6'>
                                {orderGroup.orders.map((order, innerIndex) => (
                                    <div className='ürünler' key={innerIndex}>
                                        {innerIndex === 0 && (
                                            <h6 className='siparisDate'>Sipariş Tarihi: {formatDate(order.date)}</h6>
                                        )}
                                        <h6 className='ürün'>{order.isim} | {order.adet} Adet | {order.fiyat * order.adet} TL</h6>
                                    </div>
                                ))}
                                <div className='toplamFiyat'>
                                    <h6 className='ürün'>Toplam Fiyat: {orderPrice[orderGroup.masaID]} TL</h6>
                                </div>
                            </div>
                            <div className='deleteButton col-1'>
                                <button onClick={() => {
                                    deleteTableOrder(orderGroup.masaID);
                                    }} style={{backgroundColor:"red"}} className='btn btn-warning'><DeleteIcon sx={{color:"white"}}/></button>    
                                <button onClick={() => {
                                    complateOrder   (orderGroup.masaID);
                                    }} className='btn btn-primary complated'><ChecklistIcon sx={{color:"white"}}/></button>        
                            </div>
                        </div>
                    </div>    
                    ))}
                    </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                    <h1 className='orderColTitle'>Complated Orders (Total: {ordersComplated.length})</h1>
                    <div className='complatedOrdersArea'>
                    {ordersComplated.map((orderGroup, index) => (
                    <div className='orderContainer col-12 mb-4' key={index}>
                        <div className='row'>
                            <div className='masaNumarasi col-4'>
                            <div className='tableBox'>
                                <div className='row genelBox'>
                                <div className='col-6'>
                                    <img className='tableIcon' src={table} />
                                </div>
                                <div className='col-3'>
                                    <h5 className='tableNumber'>{orderGroup.masaID}</h5>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className='orders col-6'>
                                {orderGroup.orders.map((order, innerIndex) => (
                                    <div className='ürünler' key={innerIndex}>
                                        {innerIndex === 0 && (
                                            <h6 className='onayDate'>Onaylama Tarihi: {formatDate(order.date)}</h6>
                                        )}
                                        <h6 className='ürün'>{order.isim} | {order.adet} Adet | {order.fiyat * order.adet} TL</h6>
                                    </div>
                                ))}
                                <div className='toplamFiyat'>
                                    <h6 className='ürün'>Toplam Fiyat: {orderPriceComplated[orderGroup.masaID]} TL</h6>
                                </div>
                            </div>
                            <div className='deleteButton col-1'>
                                <button onClick={() => {
                                    deleteComplatedTableOrder(orderGroup.masaID);
                                    }} style={{backgroundColor:"red"}} className='btn btn-warning'><DeleteIcon sx={{color:"white"}}/></button>    
                            </div>
                        </div>
                    </div>    
                    ))}
                    </div>
                </div>
            </div>
            <ToastContainer />  
        </div>
    )
}

export default Orders;
