import React from 'react'
import logo from "../img/logo.jpg"
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import "../style/navbarStyle.css"
import { useParams } from 'react-router-dom';

function Navbar() {

  const { masaId } = useParams();

  return (
    <div>
      <nav className="navbar bg-body-tertiary bg-nav">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <img src={logo} className="navbarImg d-inline-block align-text-top"/>
                <h1 className='title'>Cafe Menü</h1>
            </a>
            <div className='masaID'>
                    <TableRestaurantIcon/>
                    <h5 className='textMasa'>: {masaId}</h5>
                </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
