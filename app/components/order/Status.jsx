// components/OrderStatus.js
'use client';
import { useState } from "react";


//const fetcher = url => fetch(url).then(res => res.json());

export default function Status({ paymentId }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/order/status?payment_id=${paymentId}`);
      if (!response.ok) {
        console.error('Error en la respuesta del servidor:', response);
        throw new Error('Error al obtener el estado del pedido');
      }
      const data = await response.json();
      console.log('Estado del pedido:', data);
      setOrderStatus(data);
    } catch (err) {
      setError(err.message);
      setOrderStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-black" >
      
      <button onClick={fetchOrderStatus} disabled={loading || !paymentId}>
        {loading ? 'Consultando...' : 'Consultar Estado'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orderStatus && (
        <div>
          <h2>Estado del Pedido:</h2>
          <p>Estado en Stripe: {orderStatus.stripe.message?orderStatus.stripe.message:orderStatus.stripe.status}</p>
          <p>Estado en Printful: {orderStatus.printful.message?orderStatus.printful.message:orderStatus.printful.status}</p>
          <p>Estado Final: {orderStatus.isFinal ? 'Sí' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
