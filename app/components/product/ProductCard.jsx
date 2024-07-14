'use client';
import { getCheapestVariante } from "@/app/services/productsService";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link"
import { useEffect, useState } from "react";

export const ProductCard = ({ producto }) => {
  console.log(producto)
  console.log(producto.id)

  if (!producto || !producto.id) {
    console.error('Producto no definido o sin id:', producto);
    return null; // O muestra un mensaje de error adecuado
  }

  const [product, setProduct] = useState();
  const [variants, setVariants] = useState([]);
  const [price, setPrice] = useState('')
  useEffect(() => {
    // Llamada al endpoint de la API
    fetch(`/api/user/refactor/${producto.id}`)
      .then(response => response.json())
      .then(data => {

        console.log(data);
        setProduct(data.result.sync_product);
        console.log(data.result.sync_product);
        setVariants(data.result.sync_variants);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [producto.id]);

  useEffect(() => {
    getCheapestVariante(variants)
      .then(cheapest => setPrice(cheapest))
      .catch(error => {
        console.error('Error getting cheapest variant:', error);
      });


  }, [variants])


  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    < div className="my-6 flex justify-center h-fit" >
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-fit"

      >
        <Link href={`/productos/${product.id}`}>
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src={product.thumbnail_url}
            width={200}
            isZoomed
          />
        </Link>
        <CardFooter className="justify-between bg-white/75  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" text-black/75 text-md font-bold">{price} €</p>
          <Link href={`/productos/${product.id}`}>
            <Button className="text-sm text-white bg-zinc-900/50 font-bold" variant="flat" color="default" radius="lg" size="sm">
              Buy
            </Button>
          </Link>
        </CardFooter>
      </Card>

    </div>
  )
}
