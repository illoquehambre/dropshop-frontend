// app/api/order-status/route.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const payment_id = searchParams.get('payment_id');

  // Objeto de respuesta que se construirá siempre.
  const responseObj = {
    stripe: {},
    printful: {},
    final: false,
  };

  if (!payment_id) {
    responseObj.stripe.error = 'Falta el parámetro payment_id';
    responseObj.final = true;
    return NextResponse.json(responseObj, { status: 400 });
  }

  try {
    // 1️⃣ Consultar el estado del pago en Stripe
    const session = await stripe.paymentIntents.retrieve(payment_id);
    if (!session) {
      responseObj.stripe.error = 'No se encontró la sesión de pago en Stripe';
      responseObj.final = true;
    } else {
      responseObj.stripe.status = session.status;
      responseObj.stripe.orderId = session.metadata.idDraft || null;
      
      if (session.status === 'payment_failed') {
        responseObj.stripe.message = 'El pago ha fallado.';
        responseObj.final = true;
      } else if (session.status !== 'succeeded') {
        responseObj.stripe.message = `El pago no se ha procesado. Status: ${session.status}`;
        responseObj.final = true;
      }
    }
    
    if (!responseObj.stripe.orderId) {
      responseObj.stripe.error = responseObj.stripe.error || 'No se encontró el orderId en Stripe';
      responseObj.final = true;
    }
    
    // 2️⃣ Consultar el estado del pedido en Printful (solo si se obtuvo orderId y el pago fue exitoso)
    if (responseObj.stripe.orderId && responseObj.stripe.status === 'succeeded') {
      const printfulResponse = await fetch(`https://api.printful.com/orders/${responseObj.stripe.orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!printfulResponse.ok) {
        const errorText = await printfulResponse.text();
        responseObj.printful.error = `Error en Printful: ${printfulResponse.status} - ${errorText}`;
        responseObj.final = true;
      } else {
        const printfulData = await printfulResponse.json();
        const orderStatus = printfulData.result.status;
        responseObj.printful.status = orderStatus;
        
        // Asignamos un mensaje en base al estado del pedido
        if (orderStatus === 'draft') {
          responseObj.printful.message = 'Pedido en borrador, esperando confirmación.';
          // draft puede cambiar, así que no es final
        } else if (orderStatus === 'pending') {
          responseObj.printful.message = 'Pedido confirmado, esperando producción.';
          // pending es transitorio
        } else if (orderStatus === 'failed') {
          responseObj.printful.message = 'Error en Printful, el pedido fue rechazado.';
          responseObj.final = true;
        } else if (orderStatus === 'canceled') {
          responseObj.printful.message = 'El pedido fue cancelado.';
          responseObj.final = true;
        } else if (orderStatus === 'fulfilled') {
          responseObj.printful.message = '¡Tu pedido ha sido enviado!';
          responseObj.final = true;
        }
      }
    }
    
    // Si no se llegó a consultar Printful por problemas en Stripe, la bandera final ya está en true.
    return NextResponse.json(responseObj);
    
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
