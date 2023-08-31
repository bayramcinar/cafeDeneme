import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import "../style/stockModal.css"

export default function StockTable({ show, onClose }) {
  const [rows, setRows] = useState([]);
  const [editedRowId, setEditedRowId] = useState(null);
  const [editedStockValue, setEditedStockValue] = useState('');

  useEffect(() => {
    axios.get("https://cafeapp-y5se.onrender.com/getAllProducts")
      .then(res => {
        const updatedRows = res.data.map(async product => {
          const stockResponse = await axios.get(`http://localhost:8081/getStock/${product.id}`);
          const stockValue = stockResponse.data && stockResponse.data.length > 0
            ? stockResponse.data[0].stok
            : "0";
          return { ...product, stok: stockValue };
        });
        Promise.all(updatedRows)
          .then(updatedProducts => setRows(updatedProducts))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [rows]);

  const handleEditClick = (id) => {
    setEditedRowId(id);
    const editedRow = rows.find(row => row.id === id);
    setEditedStockValue(editedRow.stok);
  };

  const handleSaveClick = (id) => {
    const editedRow = rows.find(row => row.id === id);
    const newStockValue = editedStockValue; 
    if (editedRow) {
      if (editedRow.stok === newStockValue) {
        setEditedRowId(null);
        setEditedStockValue('');
        return;
      }
  
      axios.post(`https://cafeapp-y5se.onrender.com/updateStock/${id}`, { value: newStockValue })
        .then(response => {
          console.log(response.data);
          const updatedRows = rows.map(row =>
            row.id === id ? { ...row, stok: newStockValue } : row
          );
          setRows(updatedRows);
          setEditedRowId(null);
          setEditedStockValue('');
        })
        .catch(error => {
          console.error("Error updating stock:", error);
        });
    }
  };
  

  const handleStockChange = (e) => {
    setEditedStockValue(e.target.value);
  };

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
                                <th scope="col">stok</th>
                                <th scope="col">Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                <th scope="row">{row.id}</th>
                                <td>{row.isim}</td>
                                <td>
                                    {editedRowId === row.id ? (
                                    <input
                                        className='form-control'
                                        type='number'
                                        value={editedStockValue}
                                        onChange={handleStockChange}
                                        style={{width:60}}
                                    />
                                    ) : (
                                    <h5>{row.stok}</h5>
                                    )}
                                </td>
                                <td>
                                    {!editedRowId || editedRowId !== row.id ? (
                                    <button className='btn btn-primary' onClick={() => handleEditClick(row.id)}>
                                        <EditIcon />
                                    </button>
                                    ) : (
                                    <button className='btn btn-success' onClick={() => handleSaveClick(row.id)}>
                                        <SaveIcon />
                                    </button>
                                    )}
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
