'use client';
import {ProductCard} from '@/components/product/ProductCard'
import { useState, useEffect } from 'react';

export default function Home() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Llamada al endpoint de la API
    fetch('/api/user/productos')
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
   
    <div className='grid grid-cols-3 gap-y-7'>
    {
      
      result.map((producto) =>(
        <ProductCard producto={producto} key={producto.id}/>
      )

    )
    }
    
        

    </div>

 
  );
}
