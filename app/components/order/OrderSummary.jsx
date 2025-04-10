'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
export const OrderSummary = ({ cart }) => {

    //1-trae del local storage el carrito y el idDraft
    // Estado local para guardar `idDraft` y `carrito`
    const { items, recipient, costs, retail_costs } = cart;
    const shipping = 5;
    const [totalPrice, setTotalPrice] = useState(0);


    //console.log('cart', cart)
    console.log('items', items)
    // console.log('recipient', recipient)
    console.log('costs', costs)
    console.log('retail_costs', retail_costs)

    useEffect(() => {
        if (items && items.length > 0) {

            setTotalPrice(
                () => {
                    return items.reduce((acc, product) => {
                        return acc + (product.retail_price * product.quantity);
                    }, 0);
                }
            )

        }

    }, [items]);


    return (

        <div className={` flex justify-center h-fit w-auto `}>
            <Card>
                <CardBody>
                    <Table aria-label="Example table with dynamic content ">
                        <TableHeader >
                            <TableColumn></TableColumn>
                            <TableColumn>Details</TableColumn>
                            <TableColumn>Price</TableColumn>
                        </TableHeader>
                        <TableBody items={items}>

                            {(item) => (
                                <TableRow key={item.product.id} className='text-black '>
                                    <TableCell ><Image className='w-3/5' src={item.files[1].thumbnail_url}></Image></TableCell>
                                    <TableCell className=' flex-col gap-3 align-text-top justify-center'>
                                        <p className='mt-4 text-xs md:text-md'>{item.product.name}</p>
                                        <p className='text-xs md:text-lg'>{item.quantity} x {item.retail_price} €</p></TableCell>
                                    <TableCell className='text-center text-xs md:text-lg'>{item.quantity * item.retail_price} €</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className='ml-2 flex-col gap-2 justify-start items-start'>

                    <h4>SubTotal: {totalPrice} €</h4>
                    <h4>Shipping: {shipping} €</h4>
                    <h3>Total Price: {totalPrice + shipping} €</h3>

                </CardFooter>
            </Card>


        </div>
    )
}
