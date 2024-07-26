import Link from "next/link"

const Masonry = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 py-6 px-5 sm:px-10 h-screen my-5 md:my-10">

            <div className="grid gap-4 md:gap-7 col-span-2 md:col-span-1 grid-cols-2 md:grid-cols-1 md:grid-rows-4 md:grid-flow-column">
                <Link href={`/productos?category=24`} className="md:row-span-2">
                    <div className="h-full bg-hoodie bg-cover bg-center rounded-lg overflow-hidden relative group">
                        {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                        <div className="absolute inset-0 bg-hoodie bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                        {/* Contenido adicional */}
                        <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                            <span className="text-white text-4xl font-semibold">Hoodies</span>
                        </div>
                    </div>
                </Link>
                <div className="grid md:row-span-2 gap-4 md:gap-7">
                    <Link href={`/productos?category=24`} className="md:row-span-1">

                        <div className="h-full bg-bag bg-cover bg-center rounded-lg overflow-hidden relative group">
                            {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                            <div className="absolute inset-0 bg-bag bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                            {/* Contenido adicional */}
                            <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                                <span className="text-white text-4xl font-semibold">Bolsos</span>
                            </div>
                        </div>
                    </Link>
                    <Link href={`/productos?category=24`} className="md:row-span-1">
                        <div className="h-full bg-accesories bg-cover bg-center rounded-lg overflow-hidden relative group">
                            {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                            <div className="absolute inset-0 bg-accesories bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                            {/* Contenido adicional */}
                            <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                                <span className="text-white text-4xl font-semibold">Accesorios</span>
                            </div>
                        </div>

                    </Link>
                </div>

            </div>
            <div className="grid col-span-2  gap-4 md:gap-7">
                <Link href={`/productos?category=55`} className="md:row-span-2">
                    <div className="h-full bg-painting bg-cover bg-center rounded-lg overflow-hidden relative group">
                        {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                        <div className="absolute inset-0  bg-painting bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                        {/* Contenido adicional */}
                        <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                            <span className="text-white text-4xl font-semibold">Pinturas</span>
                        </div>
                    </div>

                </Link>
                <div className="flex gap-4 md:gap-7 md:row-span-2">
                    <Link href={`/productos?category=55`} className="w-1/2 ">
                        <div className="h-full bg-notebooks bg-cover bg-center rounded-lg overflow-hidden relative group" >
                            {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                            <div className="absolute inset-0  bg-notebooks bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                            {/* Contenido adicional */}
                            <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                                <span className="text-white text-4xl font-semibold">Pinturas</span>
                            </div>
                        </div>

                    </Link>
                    <Link href={`/productos?category=55`} className="w-1/2 " >
                        <div className="h-full bg-tshirt bg-cover bg-center rounded-lg overflow-hidden relative group">
                            {/* Pseudo-elemento para la imagen de fondo con efecto de zoom */}
                            <div className="absolute inset-0  bg-tshirt bg-cover bg-center transition-transform duration-400 group-hover:scale-110"></div>
                            {/* Contenido adicional */}
                            <div className="h-full inset-0 flex md:hidden md:group-hover:flex items-center justify-center bg-black/25 rounded-lg duration-400 absolute z-10">
                                <span className="text-white text-4xl font-semibold">Pinturas</span>
                            </div>
                        </div>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Masonry;
