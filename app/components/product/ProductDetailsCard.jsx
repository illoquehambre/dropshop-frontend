'use client';
import { Card, CardBody, Image, Button, Skeleton } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { HeartIcon } from "@/public/icons/HeartIcon";
import { CartPlus } from "@/public/icons/CartPlus";
import { Money } from "@/public/icons/Money"
import ColorSelector from '@/components/selectors/ColorSelector';
import SizeSelector from '@/components/selectors/SizeSelector';
import SizeGuide from '@/components/sizeGuide/SizeGuide'
import { useCart } from '@/hooks/useCart'
import { useStore } from '@/context/store';


export default function ProductDetailsCard({ result }) {
  const producto = result.sync_product;
  //const variantes = result.sync_variants
  const variantes = useMemo(() => result.sync_variants.filter(variant => variant.availability_status === "active"), [result.sync_variants]);
  const { addToCart } = useCart()
  //console.log(variantes);

  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariante, setSelectedVariante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nonAvailableItems, setNonAvailableItems] = useState([]);


  const availableColors = useMemo(() => {
    const colors = [...new Set(variantes.map(variant => variant.color))];
    return colors.filter(color => color !== null);
  }, [variantes]);

  const availableSizes = useMemo(() => {
    const sizes = [...new Set(variantes.map(variant => variant.size))];
    return sizes.filter(size => size !== null);
  }, [variantes]);

  useEffect(() => {
    if (variantes.length > 0) {
      setSelectedSize(variantes[0].size);
      setSelectedColor(variantes[0].color);
      setSelectedVariante(variantes[0]);
      setLoading(false);
    } else {
      setSelectedSize(null);
      setSelectedColor(null);
      setSelectedVariante(null);
    }
  }, [variantes]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const nuevaVariante = variantes.find(variante => variante.color === selectedColor && variante.size === selectedSize);
      setSelectedVariante(nuevaVariante || null);
      if (nuevaVariante.availability_status != "active") {
        alert(`Este Producto con color: ${nuevaVariante.color} y talla: ${nuevaVariante.size} no está disponible en este momento. Por favor pruebe otra talla y/o color.`)
      }
      console.log(nuevaVariante);

    }
  }, [selectedColor, selectedSize, variantes]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {

    setSelectedSize(size);
  };


  //Logica de comprobacion de la disponibilidad de un producto
  /**
   * Una vez se detecta el eventod e añadir un producto, se debe llamar 
   * al método que comprueba en la API si está disponible.
   * En caso de no estarlo, este se deberá eliminar del carrito y ejecutar un alert
   * anunciando el problema existente.
   */

  /*
 Snipcart.events.on('item.added', (cartItem) => {
    console.log(cartItem);
});
*/
  /*
    const removeItemFromCart = async (uniqueId) => {
      window.Snipcart.api.cart.items.remove(uniqueId);
    };
  
    Snipcart.events.on('item.added', async (cartItem) => {
      console.log(cartItem);
      const variantId = cartItem.id;
      console.log(variantId);
  
      const response = await fetch(`/api/user/variant/${variantId}`);
      const { result } = await response.json()
      console.log(result);
  
  
      if (result.availability_status) {
        console.log("no está disponible");
        // Producto no disponible, remover del carrito
        await removeItemFromCart(cartItem.uniqueId);
  
      }
  
  
  
    });
  
  */
  /*
   const checkCartPorducts = () => {
     setNonAvailableItems([])
     const { items } = Snipcart.store.getState().cart.items
     console.log(items);
 
     items.map(async (item) => {
       console.log(item.id);
 
       fetch(`/api/user/variant/${item.id}`)
         .then(response => response.json())
         .then(async data => {
           console.log(data);
           console.log(data.result.availability_status);
           if (data.result.availability_status != "active") {
             try {
               await Snipcart.api.cart.items.remove(item.uniqueId);
               console.log('eliminado');
               setNonAvailableItems(nonAvailableItems.push(item))
             } catch (error) {
               console.error(error)
             }
           }
 
         })
         .catch(error => {
           console.error('Error fetching data:', error);
 
         });
     })
     console.log(nonAvailableItems);
     if (nonAvailableItems.length > 0) {
       alert("Algunos de los productos de su carrito no estan disponibles en este momento.\nHan sido eliminados, por favor disculpe las molestias e intente comprarlos en otro momento.")
 
     }
   }*/
  //Genera los tests de este useEffect
  /*
  useEffect(() => {
    Snipcart.events.on('item.added', checkCartPorducts());
    Snipcart.events.on('item.updated', checkCartPorducts());
    Snipcart.events.on('summary.checkout_clicked', checkCartPorducts());
    Snipcart.events.on('cart.confirmed', (cartConfirmResponse) => {
      //El pago se ha realizado sin problemas
      console.log(cartConfirmResponse);
    });

  }, []);
*/
  /**
   * Lo que se debe hacer es añadir un eventliner en un useEffect para cuando se añade un producto o se habre el carrito
   * Este llamará a un método que:
   *   
   *   1: Realizará un bucle recorriendo los elementos del carrito y mandado los id, realizando una peticion por cada uno
   *   2: comprobará la disponibildiad del producto y añadirá su id a un array si este no está disponible
   *   3: Devolverá un array con los ids de los productos que no estén disponibles
   *   4: Se eliminarán del carrito aquelos productos no disponibles recorriendo el array anterior
   *   5: Se realizará un alert anunciando los productos eliminados
   */


  return (
    <Card
      isBlurred
      className="border-none bg-zinc-100/75 dark:bg-zinc-800/50 w-100 my-6 "
      shadow="sm"
    >
      <CardBody className="overflow-clip ">
        <div className="grid grid-cols-6  md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-8 md:col-span-6 order-2 md:order-1">
            <Skeleton isLoaded={!loading} className="rounded-lg">
              <Image
                alt="Album cover"
                className="object-cover h-72 sm:h-96 md:h-full"

                shadow="md"
                src={selectedVariante && selectedVariante.files[1].preview_url}
                width="100%"
              />
            </Skeleton>
            <Skeleton isLoaded={!loading} className="rounded-lg">
              <ColorSelector onSelect={handleColorSelect} colors={availableColors}></ColorSelector>
            </Skeleton>
          </div>

          <div className="flex flex-col col-span-8 md:col-span-6 h-full gap-10 p-8 order-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col sm:flex-row sm:items-center items-start md:items-start md:flex-col gap-12 md:gap-6 ">
                <Skeleton isLoaded={!loading} className="rounded-lg ">
                  <h1 className="text-xl md:text-4xl font-bold ">{producto.name}</h1>
                </Skeleton>
                <Skeleton isLoaded={!loading} className="rounded-lg ">
                  <p className="text-lg md:text-2xl font-semibold ">{selectedVariante && selectedVariante.retail_price} €</p>
                </Skeleton>
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
            <div className="flex flex-col flex-wrap gap-4 md:gap-8 mt-5  items-start  ">
              <div className="flex flex-col flex-wrap gap-4 md:gap-8 mt-5 relative overflow-x-auto w-full items-start  ">
                <span className="text-black text-lg font-medium">Seleccione una talla: </span>
                <Skeleton isLoaded={!loading} className="rounded-lg">

                  <SizeSelector onSelect={handleSizeSelect} sizes={availableSizes}></SizeSelector>
                </Skeleton>
              </div>

              <Skeleton isLoaded={!loading} className="rounded-lg">
                <SizeGuide result={result}></SizeGuide>
              </Skeleton>


            </div>

          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-12 mx-12 mt-3 mb-6 ">
          <div className="lg:col-span-6  ">

          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col sm:flex-row  gap-5 lg:gap-12 items-center justify-between md:justify-end ">


            <Button
              onClick={() => addToCart(selectedVariante)}
              isDisabled={selectedVariante && selectedVariante.availability_status != "active"}
              radius="full"
              className={` bg-gradient-to-tr   text-black  border-black shadow-lg gap-4 hover:scale-110 
                  font-semibold tex-lg  w-full sm:w-fit md:w-full xl:w-fit  from-amber-400 to-amber-300/75 hover:border-0`}
              endContent={<CartPlus />}
              size="lg"

            >
              Añadir al carrito
            </Button>
            <Button
              isDisabled={selectedVariante && selectedVariante.availability_status != "active"}
              radius="full"
              size="lg"
              className="bg-gradient-to-tr from-orange-500 to-amber-400/75 hover:scale-110 text-white shadow-lg gap-2 font-semibold  tex-lg  w-full sm:w-fit md:w-full xl:w-fit"
              endContent={<Money />}
            >
              Comprar ahora
            </Button>
            </div>
          </div>
      </CardBody>
    </Card>
  );
}
