
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
0 
  // Procesar el evento
  switch (event.type) {
    case 'payment_intent.succeeded':
      //TODAVIA NO HAY METADATA
      const payment = event.data.object;
      const orderId = payment.metadata?.idDraft || null; // Asegúrate de que el idDraft esté en la metadata del PaymentIntent
      
      console.log('Pago exitoso:', payment.id);
      // Aquí envías el pedido a Printful
      await handlePaymentSuccess(payment, orderId);
      break;

    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  // Responde que el webhook fue recibido
  return NextResponse.json({ received: true }, { status: 200 });
}

// Ejemplo de función para crear pedido en Printful
async function handlePaymentSuccess(payment, orderId) {
  console.log('webhook recibido, enviando orden:', orderId);
  //const printfulOrderId = "118064910"; // Asegúrate de que este id corresponda al id del draft en Printful
  const printfulOrderId = orderId;
  const endpoint = `https://api.printful.com/orders/${printfulOrderId}/confirm`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {  
        'Content-Type': 'application/json',
        // Se recomienda usar el token de Printful como Bearer token.
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
        // Si tu integración requiere enviar el store id, puedes agregar el header:
        // 'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error confirmando orden en Printful:', errorData);
      // Aquí podrías arrojar un error o manejarlo según tu lógica de negocio
      return;
    }
    const data = await res.json();
    console.log('Orden confirmada en Printful:', data);
  } catch (error) {
    console.error('Error en la llamada a Printful:', error);
  }

}