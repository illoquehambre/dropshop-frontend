import { useState, useEffect, useRef } from "react";
import { CartIcon } from '@/public/icons/CartIcon'
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from '@/components/cart/CartItem'
import { Button } from "@nextui-org/react";
import { Money } from "@/public/icons/Money";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null); // Referencia para el sidebar
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const { cart, clearCart, addToCart, removeOneFromCart, removeFromCart } = useCart()

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setTotalPrice(
            () => {
                return cart.reduce((acc, product) => {
                    return acc + (product.retail_price * product.quantity);
                }, 0);
            }
        )
        setTotalProducts(
            () => {
                return cart.reduce((acc, product) => {
                    return acc + product.quantity;
                }, 0);
            }
        )



    }, [cart])

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verifica si el clic fue fuera del sidebar
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false); // Cierra el sidebar
            }
        };

        // Solo agregar el listener si el sidebar está abierto
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Limpieza del efecto
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div className="flex">
            {/* Sidebar */}
            <aside ref={sidebarRef} // Asigna la referencia aquí
                className={`z-30 flex flex-col justify-between top-0 right-0 h-lvh fixed  bg-zinc-700 text-white  ${!isOpen && "hidden"} w-full sm:w-2/3 md:w-1/2 lg:w-1/3`}>
                <div className="p-4 font-bold text-lg flex justify-between content-center mt-4">

                    <span className="align-baseline">
                        Mi Carrito
                    </span>

                    {totalProducts > 0 &&
                        (<span className="align-baseline">
                            Nº de Productos: {totalProducts}
                        </span>
                        )}
                    <button
                        onClick={toggleSidebar}
                        className="bg-transparent text-white p-2 rounded-md"
                    >
                        {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        }
                    </button>
                </div>
                <ul className="bg-zinc-700 overflow-y-auto scrollbar-hide h-4/5 gap-3 flex flex-col rounded-lg">
                    {
                        cart.map((item) => (
                            <CartItem key={item.id} item={item} addToCart={addToCart} removeOneFromCart={removeOneFromCart} removeFromCart={removeFromCart} />
                        ))
                    }
                </ul>
                <div className="flex  justify-between items-center mb-0   p-4 ">
                    <span>TOTAL: {totalPrice}€</span>
                    <Link href={`/stripe/address`}>
                        <Button
                            //será disabled cuando el carrito esté vacio
                            //isDisabled={selectedVariante && selectedVariante.availability_status != "active"}
                            //href="/stripe/address"
                            radius="full"
                            className=' bg-gradient-to-tr   text-black  border-black shadow-lg gap-4 hover:scale-110 
                  font-semibold tex-lg  w-fit  from-amber-400 to-amber-300/75 hover:border-0'
                            endContent={<Money />}
                            size="lg"

                        >
                            Realizar Pedido
                        </Button>
                    </Link>

                </div>



            </aside>

            {/* Botón para abrir/cerrar el sidebar */}
            <div className="fixed top-4 right-4 ">
                <button
                    onClick={toggleSidebar}
                    className="bg-transparent text-white p-2 rounded-md"
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <CartIcon />
                    )}
                </button>
            </div>


        </div>
    );
}
