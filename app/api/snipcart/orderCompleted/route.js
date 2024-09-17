
export async function POST(req) {

    try {
        const order = req.body; // Aquí recibimos los datos del pedido de Snipcart
        console.log(req);
        console.log(order);
        // Extraer información de facturación, envío y productos del carrito
        const billingInfo = order.billingAddress;
        const shippingInfo = order.shippingAddress;
        const products = order.items;

        return new Response(JSON.stringify(req), {
            headers: { 'Content-Type': 'application/json' },
        });        
} catch (error) {
    return new Response(error, { status: 500 });
}

}