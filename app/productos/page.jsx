'use client';
import { ProductCard } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


export default function Productos() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    console.log(category);

    
    // Llamada al endpoint de la API
    fetch(`/api/user/refactor?category=${category||category!=null?category:''}`)
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
        console.log(data.result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);
  return (

    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3 min-h-screen'>

      {error ? (
        <p>{error}</p>
      ) : (

        result.map((producto) => (
          <ProductCard producto={producto} key={producto.id} />
        )

        )
      )
      }



    </div>


  );
}
