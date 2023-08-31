import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/addProduct.css"
import { useState, useEffect } from 'react'

export default function AddCategory({ show, onClose }) {
    const [file, setFile] = useState();
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    


    const successToast = () => {
        toast.success('Category is added successfully !', {
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

    const [categoryInfo, setCategoryInfo] = React.useState({
        kategoriName: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const save1 = () => {
        successToast();
        console.log(file);
        axios.post("http://localhost:8081/setCategory", categoryInfo)
        .then(res => {
            const formData = new FormData();
            formData.append("image", file);
            console.log(res.data);
    
            axios.post(`http://localhost:8081/uploadCategoryImg/${res.data.insertId}`, formData)
                .then(uploadRes => {
                    console.log(uploadRes.data);
                })
                .catch(uploadErr => console.log(uploadErr)); 
        })
        .catch(err => console.log(err)); 
    
        onClose();
    }
    

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
                            label="Kategori İsmi"
                            variant="outlined"
                            name="kategoriName"
                            value={categoryInfo.kategoriName}
                            onChange={handleInputChange}
                        />
                        <Button className='saveButton' variant="outlined" onClick={save1}>save</Button>
                        </Box>
                        </div>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
        </>
    );
}
