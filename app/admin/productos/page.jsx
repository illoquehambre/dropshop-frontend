'use client';
import {ProductCardAdmin} from '@/components/product/ProductCardAdmin'
import { useState, useEffect } from 'react';

export default function AdminProducts({params}) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Llamada al endpoint de la API
    fetch(`/api/admin/productos/`)
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
   
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3'>
    {
      
      result.map((producto) =>(
        <ProductCardAdmin producto={producto} key={producto.id}/>
      )

    )
    }
    
        

    </div>

 
  );
}
