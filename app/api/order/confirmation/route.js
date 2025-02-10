import { buffer } from 'micro';
import Stripe from 'stripe';
import { notifyClient } from '../SSE/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});


export async function POST(req) {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return new Response('Webhook Error', { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const idDraft = paymentIntent.metadata.idDraft;
        // Obtener idDraft desde la metadata
        ///const idDraft = paymentIntent.metadata.idDraft;

        if (!idDraft) {
            console.error('No idDraft in metadata');
            return new Response('Missing idDraft', { status: 400 });
        }

        try {
            // Confirmar el pedido en Printful
            const response = await confirmOrderInPrintful(idDraft);

            // Notificar al cliente si hay una conexión SSE abierta
            notifyClient(idDraft, {
                status: 'success',
                order: response,
            });

            return new Response('Order confirmed and notified', { status: 200 });
        } catch (err) {
            console.error('Error confirming order in Printful:', err);

            // Notificar al cliente del error
            notifyClient(idDraft, {
                status: 'error',
                error: err.message,
            });

            return new Response('Error confirming order', { status: 500 });
        }
    }

    return new Response('Unhandled event type', { status: 400 });
}

// Simula una función que confirma el pedido en Printful
async function confirmOrderInPrintful(idDraft) {
    const response = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idDraft,
            // Otros datos necesarios para confirmar el pedido
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to confirm order in Printful');
    }

    return await response.json();
}
