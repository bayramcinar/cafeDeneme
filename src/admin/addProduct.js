import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/addProduct.css"
import { useState, useEffect } from 'react'

export default function AddProduct({ show, onClose }) {
    const [file, setFile] = useState();
    const [productInfo, setProductInfo] = useState({
        isim: '',
        fiyat: '',
        açıklama: '',
        kategoriID: ''
    });
    const [liste, setListe] = useState([]);
    const [Kategori, setKategori] = useState('');

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setFile(selectedFile);
        console.log(file);
    }

    useEffect(() => {
        axios.get("https://serverdeneme-p4tc.onrender.com/getAllCategories")
            .then(res => {
                setListe(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const successToast = () => {
        toast.success('Product is added successfully !', {
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
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            console.log(formData);
        }
    }, [file]);

    const save = () => {
        successToast();
        axios.post("https://serverdeneme-p4tc.onrender.com/setProduct", productInfo)
            .then(res => {
                const formData = new FormData();
                console.log(file);
                formData.append("image", file);
                console.log(res.data);
                axios.post(`https://serverdeneme-p4tc.onrender.com/uploadProductImg/${res.data.ProductId}`, formData)
                    .then(uploadRes => {
                        console.log(uploadRes.data);
                    })
                    .catch(uploadErr => console.log(uploadErr));
            })
        .catch(err => console.log(err)); 
        onClose();
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleKategoriChange = (event) => {
        const kategoriID = event.target.value;
        setKategori(kategoriID);
        setProductInfo((prevInfo) => ({
            ...prevInfo,
            kategoriID: kategoriID
        }));
    };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Body>
                    <div className='center'>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <input type='file' className='form-control' onChange={handleFile} />
                            <TextField
                                id="productName"
                                label="Ürün İsmi"
                                variant="outlined"
                                name="isim"
                                value={productInfo.isim}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="productPrice"
                                label="Ürün Fiyatı"
                                variant="outlined"
                                name="fiyat"
                                value={productInfo.fiyat}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="productDescription"
                                label="Ürün Açıklaması"
                                variant="outlined"
                                name="açıklama"
                                value={productInfo.açıklama}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ürün Kategorisi</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Ürün Kategorisi"
                                    name="kategoriID"
                                    value={Kategori}
                                    onChange={handleKategoriChange}
                                >
                                    {liste.map((kategori) => (
                                        <MenuItem key={kategori.id} value={kategori.id}>
                                            {kategori.kategoriName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button className='saveButton' variant="outlined" onClick={() =>{
                                save();
                            }}>save</Button>

                        </Box>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}
