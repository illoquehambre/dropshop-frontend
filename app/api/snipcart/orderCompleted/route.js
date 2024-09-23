
export async function POST(req) {

    try {
      
        
        const data = await req.json(); // Aquí recibimos los datos del pedido de Snipcart
        console.log(req);
        console.log(JSON.stringify(data));
        // Extraer información de facturación, envío y productos del carrito
        const billingInfo = order.billingAddress;
        const shippingInfo = order.shippingAddress;
        const products = order.items;

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });        
} catch (error) {
    return new Response(error, { status: 500 });
}

}