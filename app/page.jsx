'use client';
import {ProductCard} from '@/components/product/ProductCard'
import { useState, useEffect } from 'react';
import Masonry from '@/app/components/masonry/Masonry'

export default function Home() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Llamada al endpoint de la API
    fetch('/api/user/refactor')
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
    <Masonry></Masonry>
    <span className='text-4xl text-black font-semibold'>All our Products: </span>
    <div className='grid grid-cols-2 md:grid-cols-3 gap-y-7 mt-12 gap-x-3'>
      
    {
      
      result.map((producto) =>(
        <ProductCard producto={producto} key={producto.id}/>
      )

    )
    }
    
        

    </div>

</>
    
   
    
 
  );
}
