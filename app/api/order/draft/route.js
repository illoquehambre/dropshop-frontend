// pages/api/create-order-draft.js
export async function POST(req) {

    const { items, recipient, externalId } = req.body;

    try {
        const response = await fetch('https://api.printful.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
            body: JSON.stringify({
                external_id: externalId,
                confirm: false,  // No confirmamos aún, el pedido queda en draft
                shipping: 'STANDARD',
                recipient,
                items,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }

        return new Response(JSON.stringify({ orderId: data.result.id }), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });

    }
}
