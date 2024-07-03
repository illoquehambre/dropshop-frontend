import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link"

export const ProductCard = ({ producto }) => {
  console.log(producto)
  console.log(producto.price)

  return (
    < div className="my-6 flex justify-center h-fit" >  
        <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-fit"

      >
        <Link href={`/productos/${producto.id}`}>
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src={producto.thumbnail_url}
            width={200}
            isZoomed
          />
        </Link>
        <CardFooter className="justify-between bg-white/75  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" text-black/75 text-md font-bold">{producto.price}€</p>
          <Link href={`/productos/${producto.id}`}>
            <Button className="text-sm text-white bg-zinc-900/50 font-bold" variant="flat" color="default" radius="lg" size="sm">
              Buy
            </Button>
          </Link>
        </CardFooter>
      </Card>

    </div>
  )
}
