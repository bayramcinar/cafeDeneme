import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockChart({categoryID}) {
    const [labels,setLabels] = useState([]);
    const [stock,setStock] = useState([]);
    const [title,setTitle] = useState("");
         
    useEffect(() => {
        axios.get(`http://localhost:8081/getAllStock/${categoryID}`)
        .then(res => {
            const isimler = res.data.map(item => item.isim); 
            setLabels(isimler); 
            setStock(res.data.map(item => item.stok)); 
        })
        .catch(err => console.log(err));
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:8081/getCategoryName/${categoryID}`)
        .then(res => {
            setTitle(res.data[0].kategoriName);
        })
        .catch(err => console.log(err));
    }, []);

    Chart.register(...registerables);
    Chart.register(CategoryScale);
    const data = {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: "Stock",
            backgroundColor: ["#B31312", "#A084E8", "#8BE8E5", "#D5FFE4", "#916DB3"],
            data: stock 
          }
        ]
      };

  return (
    <div>
      <h2 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{title} Stock</h2>  
      <Bar className='Table' data={data} />
    </div>
  );
}

export default StockChart;
