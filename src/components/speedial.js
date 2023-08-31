import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import "../style/speedial.css";
import axios from 'axios';

export default function SpeedMenu() {
  const [kategori, setKategori] = useState([]);
  const [open, setOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const { masaId } = useParams();

  useEffect(() => {
    axios.get("https://cafeapp-y5se.onrender.com/getCategoryNames")
      .then(res => {
        setKategori(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const actions = kategori.map((kategoriItem) => {
    const kategoriAdi = kategoriItem.kategoriName.toLowerCase().replace(/\s+/g, '-');
    return {
      icon: <img className='speedIcon' style={{ color: "blue" }} src={`https://cafeapp-y5se.onrender.com/images/` + kategoriItem.icon} alt={kategoriItem.kategoriName}></img>,
      name: kategoriItem.kategoriName,
      link: `/masa/${masaId}/${kategoriAdi}`
    };
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickOutside = (event) => {
    const isYonlendirme = event.target.classList.contains('yönlendirme');
    const isInsideSpeedDial = event.target.closest('.speedDialContainer');
  
    if (!isInsideSpeedDial && !isYonlendirme) {
      setOpen(false); 
      setIsBlurred(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  
    const blurredElements = document.querySelectorAll('.generalList, .cartBlur, .generalDiv');
    blurredElements.forEach((element) => {
      if (isBlurred) {
        element.style.filter = 'blur(5px)';
      } else {
        element.style.filter = 'none';
        setOpen(false); 
      }
    });
  
    return () => {
      document.removeEventListener('click', handleSpeedMenuClick, true);
    };
  });
  

  const handleSpeedMenuClick = () => {
    setIsBlurred(!isBlurred);
    setOpen(!open);
  };

  return (
    <div className="speedDialContainer">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<MenuIcon />}
        open={open}
        onClick={() => {
          handleSpeedMenuClick();
        }}
        onOpen={handleToggle}
        onClose={handleToggle}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <div
                className='menüIcons'
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: index % 2 === 0 ? 'start' : 'end', 
                  color: 'white',
                }}
              >
                {index % 2 === 0 ? action.icon : null} 
                <div
                  className='textAreaDial'
                  style={{
                    marginLeft: index % 2 === 0 ? 20 : 0,
                    marginRight: index % 2 !== 0 ? 10 : 0,
                    backgroundColor: "rgb(68, 119, 206)",
                    borderRadius: 10
                  }}
                >
                  <h5
                    className='textOfDial'
                    style={{
                      color: "white",
                      padding: 7,
                      fontSize: 14,
                      fontWeight: 600,
                      width: "max-content"
                    }}
                  >
                    {action.name}
                  </h5>
                </div>
                {index % 2 !== 0 ? action.icon : null} 
              </div>
            }
            component={Link}
            to={action.link}
            sx={{
              width: 60,
              height: 60,
            }}
            onClick={() => setIsBlurred(false)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
