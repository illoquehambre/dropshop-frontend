'use client';
import { ProductCard } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';
import { Slider } from "@nextui-org/react";
import { useStore } from '@/context/store';


export default function Productos() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductosContent />
    </Suspense>
  );
};

const ProductosContent = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [filteredData, setFilteredData] = useState(null)
  const [value, setValue] = useState([0, 100]);
  const { title } = useStore();

  // Esta función será llamada por cada hijo para pasar los detalles al padre


  // Filtrar productos cuando se cambia el precio



  useEffect(() => {
    const category = searchParams.get('category' || '');



    // Llamada al endpoint de la API
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/printful-products/${title}?category=${category || category != null ? category : ''}`)
      .then(response => response.json())
      .then(data => {
        setResult(data.result);

        setLoading(false);
        setCategoryName(selectCategoryName(category))
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })

  }, [searchParams]);


  const selectCategoryName = (key) => {
    switch (key) {
      case '24':
        return 'Camisetas'

      case '58':
        return 'Sudaderas'

      case '62':
        return 'Accesorios'


      default: return 'Novedades'


    }
  }

  return (
    <>
      <h1 className='text-zinc-800 text-3xl font-bold mt-10'>{categoryName}</h1>
      <Slider
        label="Price Range"

        minValue={0}
        maxValue={100}
        value={value}
        onChange={setValue}
        onChangeEnd={(newRange) => setFilteredData({ minPrice: newRange[0], maxPrice: newRange[1] })} // Filtra al soltar

        formatOptions={{ style: "currency", currency: "EUR" }}

        className="max-w-md text-black"
        tooltipProps={{
          offset: 10,
          placement: "bottom",
          classNames: {
            base: [
              // arrow color
              "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
            ],
            content: [
              "py-2 shadow-xl",
              "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
            ],
          },
        }}
      />


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3 min-h-screen">
        {error ? (
          <p>{error}</p>
        ) : (

          result.map(producto => (
            <ProductCard className={result.filter(p => p.id == producto.id ? 'block' : 'hidden')} producto={producto} key={producto.id} filteredData={filteredData} />
          ))
        )}
      </div>
    </>
  );
};


const LoadingSkeleton = () => {
  return (

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-3 min-h-screen">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} height={200} width="100%" />
      ))}
    </div>

  );
};
