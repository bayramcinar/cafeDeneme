import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedMenu from './speedial';
import { Link,useParams } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';

export default function BottomBar() {;
  const[number,setNumber] = React.useState(0);

  const { masaId } = useParams();
  
  React.useEffect(() => {
    axios.get(`http://localhost:8081/getTotalCart/${masaId}`)
      .then(res => {
        setNumber(res.data.totalItems);
      })
      .catch(err => console.log(err));
  });
  


  return (
    <BottomNavigation
      showLabels
      sx={{ width: "100%", position: "absolute", bottom: 0, backgroundColor: "red" }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon fontSize='large' sx={{ width: 45 }} />}
        sx={{ color: "white" }}
        component={Link}
        to={`/masa/${masaId}`}
      />
      <BottomNavigationAction 
        className='yönlendirme'
        icon={<SpeedMenu  />}
        sx={{ color: "white", marginRight: 4, marginBottom: 0 }}

      />
      <BottomNavigationAction
        label="Sepet"
        icon={
          <Badge badgeContent={number} color="primary" >
              <ShoppingCartIcon fontSize='large' />
          </Badge>
        }
        sx={{ color: "white" }}
        component={Link}
        to={`/masa/${masaId}/cart`}
      />
    </BottomNavigation>
  );
}
