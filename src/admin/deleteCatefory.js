import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import "../style/stockModal.css"
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteCategory({ show, onClose }) {
  const [rows, setRows] = useState([]);
  const [editedRowId, setEditedRowId] = useState(null);
  const [editedStockValue, setEditedStockValue] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8081/getAllCategories")
      .then(res => {
        setRows(res.data);
      })
      .catch(err => console.log(err));
  });
  
  const errorToast = () => {
    toast.error('There is products that have this category, firstly delete them !', {
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

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:8081/deleteCategory/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error === 'A product with this ID exists. Delete the product first.') {
            errorToast();
        } else {
          console.error("Error deleting product:", error);
        }
      });
  }
  


  return (
        <>
            <Modal show={show} onHide={onClose}>
                    <Modal.Body className='stockListModal'>
                    <div style={{ height: 400, width: '100%' }}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">isim</th>
                                <th scope="col">Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                <th scope="row">{row.id}</th>
                                <td>{row.kategoriName}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleDeleteClick(row.id)}>
                                        <DeleteIcon />
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
        </>
    
  );
}
