import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Usa la clave secreta en lugar de la pública

export async function POST(req) {
    try {
        const body = await req.json(); // Parseamos el cuerpo de la solicitud
        const { amount, currency } = body;

        // Creamos el PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        // Respondemos con el client_secret necesario para el Payment Element
        return new Response(
            JSON.stringify({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating Payment Intent:', error);

        // Devuelve una respuesta con un error
        return new Response(
            JSON.stringify({ error: 'Failed to create Payment Intent' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function PUT(req) {
    try {
        console.log("ENTRA EN EL PACTH");
        
        const body = await req.json(); // Parseamos el cuerpo de la solicitud
        console.log("BODY:", body);
        
        const { paymentIntentId, idDraft, amount } = body; // ID del PaymentIntent y nuevo draft_id
        console.log("paymentIntentId:", paymentIntentId);
        console.log("idDraft:", idDraft);
        console.log("amount:", amount);
        

        if (!paymentIntentId || !idDraft) {
            return new Response(
                JSON.stringify({ error: 'PaymentIntent ID and idDraft are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        // Actualizamos el PaymentIntent
        const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
            amount,
            metadata: { idDraft },
        });

        // Respondemos con el PaymentIntent actualizado
        return new Response(
            JSON.stringify({ paymentIntent: updatedPaymentIntent }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating Payment Intent:', error);

        // Devuelve una respuesta con un error
        return new Response(
            JSON.stringify({ error: 'Failed to update Payment Intent' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
