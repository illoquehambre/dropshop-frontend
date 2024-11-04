import { useState } from "react";
import { CartIcon } from '@/public/icons/CartIcon'
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from '@/components/cart/CartItem'
import { Button } from "@nextui-org/react";
import { Money } from "@/public/icons/Money";
export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, clearCart, addToCart, removeOneFromCart, removeFromCart } = useCart()
    console.log(cart);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`z-30 flex flex-col justify-between top-0 right-0 h-lvh fixed  bg-zinc-700 text-white  ${!isOpen && "hidden"} w-full sm:w-2/3 md:w-1/2 lg:w-1/3`}>
                <div className="p-4 font-bold text-lg flex justify-between content-center mt-4">

                    <span className="align-baseline">
                        Mi Carrito
                    </span>

                    {
                        //Aqui iria el numero total de items
                    }
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
                    <span>TOTAL:</span>
                    <Button
                        //onClick={}
                        //será disabled cuando el carrito esté vacio
                        //isDisabled={selectedVariante && selectedVariante.availability_status != "active"}
                        radius="full"
                        className={` bg-gradient-to-tr   text-black  border-black shadow-lg gap-4 hover:scale-110 
                  font-semibold tex-lg  w-fit  from-amber-400 to-amber-300/75 hover:border-0`}
                        endContent={<Money />}
                        size="lg"

                    >
                        Añadir al carrito
                    </Button>
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
