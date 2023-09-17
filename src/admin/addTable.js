import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/addProduct.css"

export default function AddTable({ show, onClose }) {

    const successToast = () => {
        toast.success('Table is added successfully !', {
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

    const [tableInfo, setTableInfo] = React.useState({
        id: '0'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTableInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const save = () => {
        successToast();
        axios.post("https://demobackend-j4un.onrender.com/setTable",tableInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
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
                        <TextField
                            id="masaID"
                            label="Masa ID"
                            variant="outlined"
                            type='number'
                            name="id"
                            value={tableInfo.id}
                            onChange={handleInputChange}
                        />
                        <Button className='saveButton' variant="outlined" onClick={save}>save</Button>
                        </Box>
                        </div>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
        </>
    );
}
