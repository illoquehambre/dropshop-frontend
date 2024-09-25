import { Card, CardBody, Image, Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";

export const CartItem = ({item, addToCart, removeOneFromCart,removeFromCart}) => {
    console.log(item);
   




  return (
    <li className="flex px-5 justify-center">


    <Card
        isBlurred
        className="border-none rounded-lg bg-background/60 dark:bg-default-100/50 w-full overflow-clip "
        shadow="sm"
    >
        <CardBody>
            <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-4">
                    <Image
                        alt={item.name}
                        className="object-cover  h-32"

                        shadow="sm"
                        src={item.product.image}
                        width="100%"
                    />
                </div>

                <div className="flex flex-col col-span-8 h-full justify-between mr-1 lg:mr-3">
                    <div>


                        <div className="flex justify-end">
                            <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="faded"
                                radius="md"
                                className="h-12 w-12"
                                onPress={() => removeFromCart(item)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </Button>
                        </div>
                        <div className="flex flex-wrap flex-row gap-2 justify-between items-start ">

                            <h2 className="text-xl sm:text-lg lg:text-xl font-medium mt-2 text-wrap">{item.name}</h2>

                        </div>
                    </div>
                    <div className="flex flex-row justify-between md:justify-between  items-center">
                        <div className="flex flex-row gap-2 lg:gap-5 items-center justify-start">
                            <Button
                                isIconOnly
                                isDisabled={item.quantity<=1}
                                variant="light"
                                onPress={() => removeOneFromCart(item)}
                            >
                                <div className=" px-2 lg:px-3 items-start bg-slate-500/25 font-semibold lg:font-bold text-xl sm:text-lg lg:text-3xl ">
                                    -
                                </div>
                            </Button>
                            <p className="font-semibold text-lg lg:text-xl">{item.quantity}</p>
                            <Button
                                isIconOnly

                                variant="light"
                                onPress={() => addToCart(item)}
                            >
                                <div className=" px-2 lg:px-3 items-start bg-slate-500/25 font-semibold lg:font-bold text-xl sm:text-lg lg:text-3xl ">
                                    +
                                </div>
                            </Button>
                        </div>


                        <h3 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold  ">{`${item.retail_price*item.quantity} €`}</h3>
                    </div>





                </div>
            </div>
        </CardBody>
    </Card>
</li>
  )
}
