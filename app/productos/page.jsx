'use client';
import {ProductCard} from '@/components/product/ProductCard'
import { useState, useEffect } from 'react';

export default function Productos() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Llamada al endpoint de la API
    fetch(`/api/user/refactor`)
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
        console.log(data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
   
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3 min-h-screen'>
    {
      
      result.map((producto) =>(
        <ProductCard producto={producto} key={producto.id}/>
      )

    )
    }
    
        

    </div>

 
  );
}
