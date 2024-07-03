'use client';
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useState } from "react";
import { HeartIcon } from "@/public/icons/HeartIcon";
import { CartPlus } from "@/public/icons/CartPlus";
import { Money } from "@/public/icons/Money";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import ColorSelector from '@/components/colorSelector/ColorSelector'

//import { getCheapestVariante } from "@/app/services/productsService";

const variants = [
  { id: 1, size: 'S', color: 'Red' },
  { id: 2, size: 'S', color: 'Blue' },
  { id: 3, size: 'M', color: 'Red' },
  { id: 4, size: 'M', color: 'Green' },
  { id: 5, size: 'L', color: 'Blue' },
  { id: 6, size: 'L', color: 'Green' },
  // ... otras variantes
];


export default function ProductDetailsCard({ result }) {
  const producto = result.Producto
  const variantes = result.Variantes
  console.log(result);
  console.log(variantes);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Obtener todas las tallas disponibles
  const availableColors = [...new Set(variantes.map(variant => variant.color))];
  const filteredColors = availableColors.filter(color => color !== null);
/*
  // Obtener colores disponibles según la talla seleccionada
  const availableSizes = selectedSize
    ? [...new Set(variants.filter(variant => variant.size === selectedSize).map(variant => variant.color))]
    : [...new Set(variants.map(variant => variant.color))];

  // Obtener tallas disponibles según el color seleccionado
  const filteredSizes = selectedColor
    ? [...new Set(variants.filter(variant => variant.color === selectedColor).map(variant => variant.size))]
    : availableSizes;

*/


  const [liked, setLiked] = useState(false);

 

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    console.log(color);
  };


  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-100"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-8 md:col-span-6">
            <Image
              alt="Album cover"
              className="object-cover"
              height={800}
              shadow="md"
              src={producto.thumbnail_url}
              width="100%"
            />
            <ColorSelector onSelect={handleColorSelect} colors={filteredColors}></ColorSelector>
          </div>

          <div className="flex flex-col col-span-4 md:col-span-6 h-full justify-between p-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-6">
                <h1 className=" text-4xl font-bold">{producto.name}</h1>
                <p className="text-2xl text-semibold">{producto.price} €</p>

              </div>

              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">

              <Tabs size="lg" variant="light" key="blue" color="primary" aria-label="Tabs colors" radius="full">
                <Tab key="xs" title="XS" />
                <Tab key="s" title="S" />
                <Tab key="m" title="M" />
                <Tab key="l" title="L" />
                <Tab key="xl" title="XL" />
              </Tabs>

            </div>

            <div className=" flex fit-content ">
              <div isBlurred
                shadow="sm" className="border-none  w-100 flex gap-2  rounded-lg   items-center">
                <button className="text-lg text-semibold bg-zinc-800 px-3 py-1 rounded-lg  text-white hover:scale-105" >-</button>
                <p className="text-lg text-semibold  bg-zinc-300/25 px-5 py-1  rounded-md">1</p>
                <button className="text-lg text-semibold bg-zinc-800 px-3 py-1 rounded-lg  text-white hover:scale-105">+</button>
              </div>

            </div>


            <div className="flex gap-8 items-center ">
              <Button radius="full" className="bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-lg gap-4 hover:scale-110" endContent={<CartPlus />}>
                Add to Cart
              </Button>
              <Button radius="full" className="bg-gradient-to-tr from-emerald-500 to-teal-300 hover:scale-110 text-white shadow-lg gap-2" endContent={<Money />}>
                Buy
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

/**
 * <RadioGroup
  label="Select your favorite city"
  orientation="horizontal"
>
  <Radio value="buenos-aires" className="accent-red-500" color="danger">Buenos Aires </Radio>
  <Radio value="sydney">Sydney</Radio>
  <Radio value="san-francisco">San Francisco</Radio>
  <Radio value="london">London</Radio>
  <Radio value="tokyo">Tokyo</Radio>
</RadioGroup>
 */
