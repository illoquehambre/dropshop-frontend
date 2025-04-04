import { Edu_VIC_WA_NT_Beginner } from 'next/font/google';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // Validar firma del webhook
  const signature = req.headers.get('stripe-signature');
  let event;

  try {
    // Lee el cuerpo de la solicitud como texto
    const requestBody = await req.text();
   
    
    // Valida la firma del webhook
    event = stripe.webhooks.constructEvent(
      requestBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error al validar webhook:', err.message);
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 });
  }

  // Procesar el evento
  switch (event.type) {
    case 'payment_intent.succeeded':
      //TODAVIA NO HAY METADATA
      const payment = event.data.object;
      const orderId = payment.metadata?.order_id;
      
      console.log('Pago exitoso:', payment.id);
      // Aquí envías el pedido a Printful
      await handlePaymentSuccess(payment);
      break;

    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  // Responde que el webhook fue recibido
  return NextResponse.json({ received: true }, { status: 200 });
}

// Ejemplo de función para crear pedido en Printful
async function handlePaymentSuccess(payment) {
  console.log('webhook recibido, enviando orden:', payment.id);
  console.log("metadata", payment.metadata);
}