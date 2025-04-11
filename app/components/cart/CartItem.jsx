import { Card, CardBody, Image, Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";

export const CartItem = ({ item, addToCart, removeOneFromCart, removeFromCart }) => {

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
                                src={item.files[1].thumbnail_url}
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col col-span-8 h-full justify-between mr-1 lg:mr-3">
                            <div >

                                <div className=" absolute right-2 top-2">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        color="danger"
                                        variant="transparent"
                                        radius="md"
                                        className="h-10 w-10"
                                        onPress={() => removeFromCart(item)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M10 10l4 4m0 -4l-4 4" /> <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /> </svg>

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
                                        isDisabled={item.quantity <= 1}
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


                                <h3 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold  ">{`${item.retail_price * item.quantity} €`}</h3>
                            </div>





                        </div>
                    </div>
                </CardBody>
            </Card>
        </li>
    )
}
