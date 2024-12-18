// pages/api/create-order-draft.js
export async function POST(req) {
    const body = await req.json();
    const { items, recipient, retail_costs } = body;
    console.log("Recipient: ", recipient);

    try {
        const response = await fetch('https://api.printful.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
            body: JSON.stringify({
                retail_costs,
                recipient,
                items,
            }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }

        return new Response(JSON.stringify({ orderId: data.result.id }), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });

    }
}

export async function PUT(req) {
    const body = await req.json();
    const { orderId, items, recipient, retail_costs } = body;

    if (!orderId) {
        return new Response('Missing orderId in request body', { status: 400 });
    }

    console.log("Updating order: ", orderId);
    console.log("Recipient: ", recipient);

    try {
        const response = await fetch(`https://api.printful.com/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
            body: JSON.stringify({
                retail_costs,
                recipient,
                items,
            }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            return new Response(`Failed to update order: ${data.error.message}`, { status: response.status });
        }

        return new Response(JSON.stringify({ message: "Order updated successfully", data: data.result }), { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
