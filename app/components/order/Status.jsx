// components/OrderStatus.js
'use client';
import { useState, useEffect } from "react";

export default function Status({ paymentId }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10);

  // Función para obtener el estado del pedido
  const fetchOrderStatus = async () => {
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
    } catch (err) {
      setError(err.message);
      setOrderStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // Al renderizar la página se llama automáticamente a fetchOrderStatus
  useEffect(() => {
    if (paymentId) {
      fetchOrderStatus();
    }
  }, [paymentId]);

  // useEffect para la cuenta atrás y re-consulta mientras el estado no sea final
  useEffect(() => {
    // Si no hay un estado o si ya es final, no iniciamos la cuenta regresiva
    if (!orderStatus || orderStatus.final) return;

    // Reiniciamos la cuenta atrás a 10 segundos cada vez que se obtiene un estado no final
    setCountdown(10);

    // Configuramos un intervalo que decrementa la cuenta cada segundo
    const intervalId = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Si la cuenta llega a 0, se reinicia el intervalo y se vuelve a consultar el estado
          clearInterval(intervalId);
          fetchOrderStatus();
          return 10; // Se vuelve a reiniciar para la siguiente iteración si sigue sin ser final
        }
        return prev - 1;
      });
    }, 1000);

    // Limpiamos el intervalo al desmontar o al cambiar orderStatus
    return () => clearInterval(intervalId);
  }, [orderStatus]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-black">
      {loading && <p>Consultando estado...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orderStatus && (
        <div>
          <h2>Estado del Pedido:</h2>
          <p>Estado en Stripe: {orderStatus.stripe.message ? orderStatus.stripe.message : orderStatus.stripe.status}</p>
          <p>Estado en Printful: {orderStatus.printful.message ? orderStatus.printful.message : orderStatus.printful.status}</p>
          <p>Estado Final: {orderStatus.final ? 'Sí' : 'No'}</p>
          {!orderStatus.final && (
            <p>
              Reconsultando en: <strong>{countdown} segundos</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
