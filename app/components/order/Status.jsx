// components/OrderStatus.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import { OrderSummary } from '@/components/order/OrderSummary';
import Countdown from './Countdown';
import { useCart } from '@/app/hooks/useCart';

export default function Status({ paymentId }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // Número de reintentos
  const { clearCart } = useCart();
  // Definimos los intervalos para cada reintento: 10 s, 20 s y 45 s.
  const nextIntervals = [10, 20, 45];

  // Función para obtener el estado del pedido
  const fetchOrderStatus = useCallback(async () => {
    if (!paymentId) return;
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
      if (data.final) {
        console.log("Es final");
        
        clearCart();
      }
    } catch (err) {
      setError(err.message);
      setOrderStatus(null);
    } finally {
      setLoading(false);
    }
  }, [paymentId]);

  // Consultar el estado al montar (o cuando paymentId cambia)
  useEffect(() => {
    if (paymentId) {
      fetchOrderStatus();
    }
  }, [paymentId, fetchOrderStatus]);

  // Controla la cuenta atrás para reconsultar el estado del pedido.
  // Se muestra únicamente si existe orderStatus, no es final y aún quedan reintentos.
  const showCountdown =
    orderStatus && !orderStatus.final && attempt < nextIntervals.length;
  const currentInterval =
    attempt < nextIntervals.length ? nextIntervals[attempt] : 0;

  // Función que se ejecuta cuando el contador llega a 0
  const handleTimeout = () => {
    if (attempt < nextIntervals.length) {
      setAttempt(prev => prev + 1);
      fetchOrderStatus();
    }
  };

  // Renderizamos el componente Countdown de forma independiente.
  // La lógica interna del Countdown se encarga de la cuenta atrás.
  return (
    <div className="w-full flex  items-center justify-center text-black">
      {loading && <p>Consultando estado...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orderStatus && (
        <div className="w-full flex gap-4 items-top justify-center text-black">
          <div className='flex flex-col gap-3 p-3'>
            <h2>Estado del Pedido:</h2>
            <p>
              Estado en Stripe:{' '}
              {orderStatus.stripe.message
                ? orderStatus.stripe.message
                : orderStatus.stripe.status}
            </p>
            <p>
              Estado en Printful:{' '}
              {orderStatus.printful.message
                ? orderStatus.printful.message
                : orderStatus.printful.status}
            </p>
            <p>Estado Final: {orderStatus.final ? 'Sí' : 'No'}</p>
            {showCountdown && (
              <Countdown interval={currentInterval} onTimeout={handleTimeout} />
            )}
            {/* Si se agotaron los intentos y el pedido sigue sin ser final se muestra el botón */}
            {orderStatus && !orderStatus.final && attempt >= nextIntervals.length && (
              <div>
                <p>No se hicieron más solicitudes automáticamente.</p>
                <button
                  onClick={() => {
                    setAttempt(0);
                    fetchOrderStatus();
                  }}
                  disabled={loading}
                >
                  Consultar de nuevo
                </button>
              </div>
            )}
          </div>
          <OrderSummary cart={orderStatus.cart} />
        </div>
      )}
    </div>
  );
}
