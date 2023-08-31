import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/homePage';
import Dashboard from './admin/dashboard';
import { BrowserRouter} from "react-router-dom";  
import Cart from './components/cart';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralList from './components/generalListe';

function App() {
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    axios.get("https://cafeapp-y5se.onrender.com/getCategoryNames")
      .then(res => {
        setKategori(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/masa/:masaId' element={<HomePage />} />
        <Route path='/masa/:masaId/cart' element={<Cart />} />
        {kategori.map(kategoriItem => {
          const kategoriAdi = kategoriItem.kategoriName.toLowerCase().replace(/\s+/g, '-');
          const routePath = `/masa/:masaId/${kategoriAdi}`;
          
          return (
            <Route
              key={kategoriItem.id}
              path={routePath}
              element={<GeneralList categoryID={kategoriItem.id} />}
            />
          );
        })}
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
