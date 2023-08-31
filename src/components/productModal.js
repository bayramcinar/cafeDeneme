import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../style/productModal.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import ResimYok from "../img/resim-yok.jpg"

function ProductModal({ product, show, handleClose}) {
    const [numberLike, setNumberLike] = useState(0);
    const [numberDislike, setNumberDislike] = useState(0);
    const [likeDisabled, setLikeDisabled] = useState(false);
    const [dislikeDisabled, setDislikeDisabled] = useState(false);

    useEffect(() => {
        if (product && product.id) {
            axios.get(`http://localhost:8081/getLikeNumber/${product.id}`)
                .then(res => {
                    setNumberLike(res.data[0].likeNumber);
                })
                .catch(err => console.log(err));
            axios.get(`http://localhost:8081/getDislikeNumber/${product.id}`)
                .then(res => {
                    setNumberDislike(res.data[0].dislikeNumber);
                })
                .catch(err => console.log(err));
        }
    }, [product]);

    const handleLike = () => {
        if (!likeDisabled) {
            axios.post(`http://localhost:8081/like/${product.id}`)
                .then(res => {
                    setNumberLike(numberLike + 1);
                    setLikeDisabled(true);
                    setDislikeDisabled(true);
                })
                .catch(err => console.log(err));
        }
    }

    const handleDislike = () => {
        if (!dislikeDisabled) {
            axios.post(`http://localhost:8081/dislike/${product.id}`)
                .then(res => {
                    setNumberDislike(numberDislike + 1);
                    setLikeDisabled(true);
                    setDislikeDisabled(true);
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        setLikeDisabled(false);
        setDislikeDisabled(false);
    }, [product]);

    if (!product) {
        return null;
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='ürünModal'>
                    <img className='modalImage img-fluid' src={product.image === null ? ResimYok : `http://localhost:8081/images/` + product.image} />
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>
                        <h5 className='modalTitle'>{product.isim}</h5>
                    </Modal.Title>
                    <h6 className='modalDetail'>{product.açıklama}</h6>
                    <h5 className='modalPrice'>{product.fiyat} TL</h5>
                    <div className='rankedArea'>
                        <div className='likeArea'>
                            <Badge badgeContent={numberLike} color="primary">
                                <ThumbUpIcon onClick={handleLike} style={{ color: likeDisabled ? '#999' : 'green', width: 40 }} />
                            </Badge>
                        </div>
                        <div className='dislikeArea'>
                            <Badge badgeContent={numberDislike} color="primary">
                                <ThumbDownIcon onClick={handleDislike} style={{ color: dislikeDisabled ? '#999' : 'red', width: 40 }} />
                            </Badge>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductModal;
