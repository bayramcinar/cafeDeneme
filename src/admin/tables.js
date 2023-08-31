import React, { useState, useEffect } from 'react';
import axios from 'axios';
import table from "../img/chair.png";
import "../style/tables.css";

function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get("https://cafeapp-y5se.onrender.com/getAllTables")
      .then(res => {
        setTables(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const renderTable = (tableData) => (
    <div key={tableData.id} className='bos col-lg-2 col-md-3 col-sm-6 mb-4'> {/* Değişiklik burada */}
      <div className='tableBox'>
        <div className='row genelBox'>
          <div className='col-6'>
            <img className='tableIcon' src={table} alt={`Table ${tableData.tableNumber}`} />
          </div>
          <div className='col-3'>
            <h5 className='tableNumber'>{tableData.id}</h5>
          </div>
        </div>
      </div>
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
      <h1 className='titleTable'>Tables</h1>  
      {renderTableRows()}
    </div>
  );
}

export default Tables;
