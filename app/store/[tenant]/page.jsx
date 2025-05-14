'use client';
import { ProductCard } from '@/components/product/ProductCard'
import { useState, useEffect, Suspense } from 'react';
import Masonry from '@/app/components/masonry/Masonry'
import { Skeleton } from '@nextui-org/react';
import { useStore } from '@/context/store';

export default function Home() {
  return (
    <>
      <Masonry></Masonry>
      <span className='text-4xl text-black font-semibold'>All our Products: </span>
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeContent />
      </Suspense>
    </>
  );
};

const HomeContent = () => {
  const [result, setResult] = useState([]);
  const {title} = useStore();
  useEffect(() => {
    // Llamada al endpoint de la API
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/printful-products/${title}`)
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

    <div className='grid grid-cols-2 md:grid-cols-3 gap-y-7 mt-12 gap-x-3'>

      {result.length > 0 && (

        result.map((producto) => (
          <ProductCard producto={producto} key={producto.id} />
        )

        )
      )
      }



    </div>






  );
}

const LoadingSkeleton = () => {
  return (

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3 min-h-screen">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} height={200} width="100%" />
      ))}
    </div>

  );
};