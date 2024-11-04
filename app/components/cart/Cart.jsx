import { useState } from "react";
import { CartIcon } from '@/public/icons/CartIcon'
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from '@/components/cart/CartItem'
export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, clearCart, addToCart, removeOneFromCart, removeFromCart } = useCart()

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`z-30  top-0 right-0 h-lvh fixed  bg-zinc-800 text-white  ${!isOpen && "hidden"} w-full sm:w-2/3 md:w-1/2 lg:w-1/3`}>
                <div className="p-4 font-bold text-lg flex justify-between content-center mt-4">

                    <span className="align-baseline">
                        Mi Carrito
                    </span>


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
                <ul className="bg-zinc-800 overflow-y-auto h-5/6 gap-3 flex flex-col">
                    {
                        cart.map((item) => (
                            <CartItem item={item} addToCart={addToCart} removeOneFromCart={removeOneFromCart} removeFromCart={removeFromCart} key={item.id}/>
                        ))
                    }
                </ul>
                <div className="flex justify-center sticky bottom-0 mt-3
                ">
                    <button onClick={clearCart}>
                        Clear Cart
                    </button>
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
