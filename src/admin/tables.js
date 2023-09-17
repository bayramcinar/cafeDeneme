import React, { useState, useEffect } from 'react';
import axios from 'axios';
import table from "../img/chair.png";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import "../style/tables.css";
import { ToastContainer, toast } from 'react-toastify';

function Tables() {
  const [tables, setTables] = useState([]);

  const successToast = () => {
    toast.success('Masa Aktif Edildi !', {
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
  toast.error('Masa Deaktif Edildi !', {
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
    axios.get("https://serverdeneme-p4tc.onrender.com/getAllTables")
      .then(res => {
        const tableDataWithStatus = res.data.map(tableData => ({
          ...tableData,
          isActive: tableData.isActive === 1 
        }));
        setTables(res.data);
      })
      .catch(err => console.log(err));
  });

  const setActive = (masaID) =>{
    axios.post(`https://serverdeneme-p4tc.onrender.com/setActive/${masaID}`)
      .then(res => {
        successToast();
      })
      .catch(err => console.log(err))
  }

  const setDeactive = (masaID) =>{
    axios.post(`https://serverdeneme-p4tc.onrender.com/setDeactive/${masaID}`)
      .then(res => {
        errorToast();
      })
      .catch(err => console.log(err))
  }

  const renderTable = (tableData) => (
    <div key={tableData.id} className='bos col-lg-2 col-md-3 col-sm-6 mb-4'> 
      <div className='tableBox'>
        <div className='row genelBox'>
          <div className='col-4'>
            <img className='tableIcon' src={table} alt={`Table ${tableData.tableNumber}`} />
          </div>
          <div className='col-2'>
            <h5 className='tableNumber'>{tableData.id}</h5>
          </div>
          <div className='col-3' >
            {tableData.isActive ? (
              <div onClick={() => setDeactive(tableData.id)} style={{display:"block",alignItems:"center",justifyContent:"center"}}>
              <NotificationsOffIcon sx={{color:"green",width:40,cursor:"pointer",marginTop:"5px"}}/>
              <span className="statusText" style={{color:"white"}}>Active</span>
              </div>
            ) : (
              <div onClick={() => setActive(tableData.id)} style={{display:"block",alignItems:"center",justifyContent:"center"}}>
              <NotificationsActiveIcon sx={{color:"red",width:40,cursor:"pointer",marginTop:"5px"}}/>
              <span className="statusText" style={{color:"white"}}>Inactive</span>
              </div>
            )}
          </div>
        </div>
      </div>
            <ToastContainer />      
    </div>
  );

  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < tables.length; i += 5) {
      const rowTables = tables.slice(i, i + 5);
      const row = (
        <div key={`row-${i}`} className='row satir'>
          {rowTables.map(tableData => renderTable(tableData))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <div>
      <h1 className='titleTable' style={{textDecoration:"underline"}}>Tables</h1>  
      {renderTableRows()}
    </div>
  );
}

export default Tables;
