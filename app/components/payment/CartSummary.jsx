import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
export const CartSummary = ({cart}) => {

    //1-trae del local storage el carrito y el idDraft
    // Estado local para guardar `idDraft` y `carrito`
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [loading, setLoading] = useState(false)
    // Función para cargar los datos iniciales desde localStorage

    //TIENE QUE LLAMAR A LA VARIANTE 
    //NO AL PRODUCTO
    //ES EL ID DE LA VARIANTE EL QU TENEMOS
    const getProducts = async (id) => {
        return fetch(`/api/user/variant/${id}`)
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw new Error('Error fetching data:', error);

            })
            .finally(() => {
                setLoading(false);
            });
    }

    const updateProducts = async () => {
        const updatedProducts = await Promise.all(
            cart.map(async p => {
                const { result } = await getProducts(p.external_id);
                return { product: result, quantity: p.quantity };
            })
        );

        setProducts(updatedProducts);
    };

    useEffect(() => {
        if (cart && cart.length > 0) {
            updateProducts();
            setTotalPrice(
                () => {
                    return cart.reduce((acc, product) => {
                        return acc + (product.retail_price * product.quantity);
                    }, 0);
                }
            )

        }

    }, [cart]);



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
                        <TableBody items={products}>

                            {(item) => (
                                <TableRow key={item.product.id} className='text-black '>
                                    <TableCell ><Image className='w-3/5' src={item.product.files[1].thumbnail_url}></Image></TableCell>
                                    <TableCell className=' flex-col gap-3 align-text-top justify-center'>
                                        <p className='mt-4 text-xs md:text-md'>{item.product.name}</p>
                                        <p className='text-xs md:text-lg'>{item.quantity} x {item.product.retail_price} €</p></TableCell>
                                    <TableCell className='text-center text-xs md:text-lg'>{item.quantity * item.product.retail_price} €</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className='ml-2'>
                    Total Price: {totalPrice}€
                </CardFooter>
            </Card>


        </div>
    )
}
