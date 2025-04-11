'use client';
import { getCheapestVariante } from "@/app/services/productsService";
import { Card, CardFooter, Image, Button, Skeleton } from "@nextui-org/react";
import Link from "next/link"
import { useEffect, useState } from "react";

export const ProductCard = ({ producto, filteredData }) => {
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setIsVisible] = useState(true)

  useEffect(() => {
    if (producto && producto.id) {
      // Llamada al endpoint de la API
      fetch(`/api/user/refactor/${producto.id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data.result.sync_product);
          setVariants(data.result.sync_variants);
          setLoading(false); // Cambiamos el estado a false al finalizar la carga
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false); // Manejamos el estado de carga en caso de error
        });
    }
  }, [producto]);

  useEffect(() => {
    if (variants.length > 0) {
      getCheapestVariante(variants)
        .then(cheapest => {
          setPrice(cheapest)
        }
        )
        .catch(error => {
          console.error('Error getting cheapest variant:', error);
        });
    }
  }, [variants]);

  useEffect(() => {
    console.log(filteredData);
    
    if (price!='' && filteredData) {
      const productPrice = price;
     
      
        const max = parseFloat(filteredData.maxPrice) || Infinity;
     
      const min=parseFloat(filteredData.minPrice) || 0;
      // Mostrar u ocultar el producto si está dentro del rango de precios
      if (productPrice >= min && productPrice <= max) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [filteredData,price ]);





  // Renderizar el producto una vez cargado
  return (
    <div className={`my-6 flex justify-center h-fit ${visible?'block':'hidden'}`}>
      <Card isFooterBlurred radius="lg" className="border-none w-fit">
        <Skeleton isLoaded={!loading} className="rounded-lg">
          <Link href={`/productos/${product && product.id}`}>
            <Image
              alt="Woman listening to music"
              className="object-cover"
              height={300}
              src={product && product.thumbnail_url}
              width={300}
              isZoomed
            />
          </Link>
        </Skeleton>
        <Skeleton isLoaded={!loading} className="rounded-large shadow-xl">
          <CardFooter className="justify-between bg-white/75 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <Skeleton isLoaded={!loading} className="w-3/5 rounded-lg">
              <p className="text-black/75 text-xs md:text-lg font-bold">{price} €</p>
            </Skeleton>
            <Link href={`/productos/${product && product.id}`}>
              <Button className=" text-xs md:text-sm text-black bg-pink-600/50 font-bold" variant="flat" color="default" radius="md" size="sm">
                Buy
              </Button>
            </Link>

          </CardFooter>
        </Skeleton>
      </Card>
    </div>
  );
}
