import React, { useState, useEffect } from 'react';
import "../style/cart.css"
import Navbar from './navbar'
import BottomBar from './bottomNavigation'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import { Link,useParams } from 'react-router-dom';

function Cart() {
  const [ürünler, setÜrünler] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0); 
  const { masaId } = useParams();
  const [active,setActive] = useState(false);

  const plus = (name) => {
    axios.post(`https://serverdeneme-p4tc.onrender.com/arti/${name}`)
      .then(res => {
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (siparisId) => {
    axios.delete(`https://serverdeneme-p4tc.onrender.com/sil/${siparisId}`)
      .then(res => {
      })
      .catch(err => console.log(err));
  }

  const mines = (name) => {
    axios.post(`https://serverdeneme-p4tc.onrender.com/eksi/${name}`)
      .then(res => {
      })
      .catch(err => console.log(err))
  }

  useEffect(() => { 
    axios.get(`https://serverdeneme-p4tc.onrender.com/getCart/${masaId}`)
      .then(res => {
        if (res.data === "noProduct") {
          setÜrünler([]);
          setToplamFiyat(0);  
        } else {
          setÜrünler(res.data);
          const total = res.data.reduce((total, ürün) => total + (ürün.fiyat * ürün.adet), 0);
          setToplamFiyat(total);
        }
      })
      .catch(err => console.log(err));
  });
  
  useEffect(() => { 
    axios.get(`https://serverdeneme-p4tc.onrender.com/getTableActive/${masaId}`)
      .then(res => {
        setActive(res.data[0].isActive);
        console.log(active);
      })
      .catch(err => console.log(err));
  },[active]);

  const deleteFromCart = (masaID) =>{
    axios.delete(`https://serverdeneme-p4tc.onrender.com/silCart/${masaID}`)
      .then(res => {
      })
      .catch(err => console.log(err))
  }
    
  const [showM, setShowM] = useState(false);

  const handleCloseM = () => {
    setShowM(false);
    setÜrünler([]);
    setToplamFiyat(0);
  }
  const handleShow = () => setShowM(true);

  const [showA, setShowA] = useState(false);

  const handleCloseA = () => {
    setShowA(false);
  }
  const handleShowA = () => setShowA(true);

  const handleSiparisVer = () => {
    const ürünlerWithMasaId = ürünler.map(ürün => ({ ...ürün, masaID: masaId }));
    if(active){
      axios.post("https://serverdeneme-p4tc.onrender.com/sendToCartAdmin", ürünlerWithMasaId)
      .then(res => {
      })
      .catch(err => console.log(err));
      handleShow(true);
      deleteFromCart(masaId);
    }else{
      handleShowA(true);
    }
  }


  const toplamAdet = ürünler.reduce((toplam, ürün) => toplam + ürün.adet, 0);
  return (
    <div>
      <Navbar/> 
      <div className='cartBlur'>
      <div className='cartTitle'>
        <h1 className='titleText animate__animated animate__fadeInDown'>SEPET</h1>
      </div>
      <div className='infoCart animate__animated animate__fadeInLeft'>
        <h5 className='infoText'>Sepetim</h5>
        <div className='btn infoAdet btn-warning'>{toplamAdet} adet</div>
      </div>
      <div className='cartProducts'>
        {ürünler.map((ürün, index) => (
          (ürün.adet > 0) && (
            <div className='generalInfos' key={index}>
              <div className='cartProduct animate__animated animate__zoomIn'>
                <div className='row'>
                  <div className='col-4'>
                    <img className='cartProductImage' src={`https://serverdeneme-p4tc.onrender.com/images/` + ürün.image} />
                  </div>
                  <div className='col-6'>
                    <h5 className='cartProductTitle'>{ürün.isim}</h5>
                    <h4 className='cartProductPrice'>{(ürün.fiyat * ürün.adet).toFixed(2)} TL</h4>
                  </div>
                  <div className='col-2 options'>
                    <h5 onClick={() => plus(ürün.id)}>+</h5>
                    <h5>{ürün.adet}</h5>
                    {ürün.adet === 1 ? (
                      <h5><DeleteIcon onClick={() => handleDelete(ürün.id)}/> </h5>  

                    ) : (
                      <h5 onClick={() => mines(ürün.id)}>-</h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <div className='totalPrice'>
        <div className='cartBottom row'>
          <div className='price col-4  animate__animated animate__flipInX'>
            <h4>Toplam</h4>
            <h5>{toplamFiyat.toFixed(2)} TL</h5>
          </div>
          <div className='col-8'>
          <button onClick={() => {
            handleSiparisVer();
          }} className='btn siparisButton btn-warning animate__animated animate__fadeInRight'>
            Sipariş Ver
          </button>
          </div>
        </div>
      </div>
      </div> 

      <BottomBar/>
      <>
            <Modal show={showM} onHide={handleCloseM}>
                <Modal.Body>
                    <h4>Siparişiniz verildi. Ortalama sipariş teslim süremiz 15 dakikadır.</h4>
                </Modal.Body>
            </Modal>
        </>
        <>
            <Modal show={showA} onHide={handleCloseA}>
                <Modal.Body>
                    <h4>Masanız Sipariş vermek için aktif değildir lütfen masanızı aktif ediniz !</h4>
                </Modal.Body>
            </Modal>
        </>
    </div>
    
  )
}

export default Cart;
