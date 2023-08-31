import React, { useState, useEffect } from 'react';
import "../style/dashboard.css"
import Options from './options';
import Orders from './orders';
import StockChart from './stockChart';
import axios from 'axios';

function Dashboard() {
  const [ids, setIDs] = useState([]);
  const [dailyEarn, setDealyEarn] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/getAllCategoryID")
      .then(res => {
        setIDs(res.data.map(item => item.id)); 
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
  
    axios.get(`http://localhost:8081/getDailyMoney/${formattedDate}`)
      .then(res => {
        setDealyEarn(res.data.total);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='bgBlue'>
      <nav className="navbar bg-body-tertiary bg-nav dashboardNav">
        <div className="container-fluid">
          <h1 className='dasboardNavTitle'>Dashboard</h1>
        </div>
      </nav>
      <div className='chartArea'>
        <h1 className='stockTitle'>Stock Tables</h1>
        <div className='row'>
          {ids.map(id => (
            <div className='chartOutside col-lg-4 col-sm-12'>
              <div className='chartInside' key={id}>
                <StockChart categoryID={id}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Options/>
      <div className='container'>
        <h1 className='dashboardTitle'>Orders</h1>
        <h2 className='dashboardTitle'>Total Earn for Today: {dailyEarn} TL</h2>
        <Orders/>
      </div>
    </div>
  )
}

export default Dashboard;
