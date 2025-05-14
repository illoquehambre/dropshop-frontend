'use client';
import ProductDetailsCard from '@/components/product/ProductDetailsCard';
import { useState, useEffect } from 'react';
import { Skeleton } from '@nextui-org/react';
import { useStore } from '@/context/store';

const ProductDetails = ({ params }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title } = useStore();

  useEffect(() => {
    console.log(`Fetching data for product ID: ${params.idProducto}`);

    // Llamada al endpoint de la API
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/printful-products/${title}/details/${params.idProducto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResult(data.result);
        console.log('Data fetched:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.idProducto]);



  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Skeleton isLoaded={!loading} className="rounded-lg min-h-screen">
      {
        result.length != 0 && (
          <ProductDetailsCard result={result}></ProductDetailsCard>
        )
      }

    </Skeleton>
  )
};

export default ProductDetails;
