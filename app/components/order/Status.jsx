// components/OrderStatus.js
"use client";
import { useState, useEffect, useCallback, createElement } from "react";
import { OrderSummary } from "@/components/order/OrderSummary";
import Countdown from "./Countdown";
import { useCart } from "@/app/hooks/useCart";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from "@/public/icons";

const STATUS_CONFIG = {
  final: {
    // Casos de éxito completo
    "succeeded-fulfilled": {
      type: "success",
      icon: CheckCircleIcon,
      title: "¡Pedido completado con éxito!",
      message: "Tu pago fue procesado y el pedido está en camino.",
      showContact: false,
    },

    // Casos de error en pago
    "payment_failed-*": {
      type: "error",
      icon: XCircleIcon,
      title: "Error en el pago",
      message: "No pudimos procesar tu método de pago.",
      action: "Por favor intenta con otro método de pago.",
      showContact: true,
    },

    // Pago exitoso pero error en pedido
    "succeeded-failed": {
      type: "error",
      icon: XCircleIcon,
      title: "Error en el pedido",
      message: "El pago fue exitoso pero hubo un error al procesar tu pedido.",
      action: "Contacta con nuestro equipo para resolverlo.",
      showContact: true,
    },

    // Pedido cancelado
    "*-canceled": {
      type: "warning",
      icon: ExclamationTriangleIcon,
      title: "Pedido cancelado",
      message: "El pedido fue cancelado durante el proceso.",
      showContact: true,
    },

    // Fallo general
    "default-error": {
      type: "error",
      icon: XCircleIcon,
      title: "Error desconocido",
      message: "Ocurrió un error inesperado en el proceso.",
      showContact: true,
    },
  },
  nonFinal: {
    processing: {
      icon: ClockIcon,
      title: "Procesando tu pedido",
      message: "Estamos confirmando los detalles con nuestros proveedores.",
      showProgress: true,
    },
    pending: {
      icon: ClockIcon,
      title: "Pedido en revisión",
      message: "Tu pedido está siendo verificado por nuestro equipo.",
      showProgress: true,
    },
    draft: {
      icon: InformationCircleIcon,
      title: "Preparando tu pedido",
      message: "Estamos generando la orden de compra en nuestro sistema.",
      showProgress: true,
    },
    requires_action: {
      icon: ExclamationTriangleIcon,
      title: "Acción requerida",
      message: "Necesitamos confirmar algunos detalles adicionales.",
      showProgress: true,
    },
  },
};

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
        console.error("Error en la respuesta del servidor:", response);
        throw new Error("Error al obtener el estado del pedido");
      }
      const data = await response.json();
      console.log("Estado del pedido:", data);
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
      setAttempt((prev) => prev + 1);
      fetchOrderStatus();
    }
  };

  // Renderizamos el componente Countdown de forma independiente.
  // La lógica interna del Countdown se encarga de la cuenta atrás.

  const getStatusConfig = (stripeStatus, printfulStatus) => {
    // Buscar coincidencia exacta
    const exactMatch = STATUS_CONFIG.final[`${stripeStatus}-${printfulStatus}`];
    if (exactMatch) return exactMatch;

    // Buscar patrones con wildcards
    const wildcardMatches = Object.keys(STATUS_CONFIG.final).filter((key) => {
      const [stripePattern, printfulPattern] = key.split("-");
      return (
        (stripePattern === "*" || stripePattern === stripeStatus) &&
        (printfulPattern === "*" || printfulPattern === printfulStatus)
      );
    });

    if (wildcardMatches.length > 0) {
      return STATUS_CONFIG.final[wildcardMatches[0]];
    }

    // Si no es un estado final, determinar estado no final
    const nonFinalStatus = [stripeStatus, printfulStatus].find((status) =>
      ["processing", "pending", "draft"].includes(status)
    );

    return (
      STATUS_CONFIG.nonFinal[nonFinalStatus] ||
      STATUS_CONFIG.nonFinal.processing
    );
  };

  const currentStatus = orderStatus
    ? getStatusConfig(orderStatus.stripe.status, orderStatus.printful.status)
    : null;

  const isFinalState = orderStatus?.final;
  const showContactInfo = currentStatus?.showContact && isFinalState;

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full h-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center py-12 bg-transparent">
            <div className="flex justify-center items-center space-x-2">
              <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin" />
              <span className="text-gray-700">
                Verificando estado del pedido...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex items-center">
              <XCircleIcon className="h-5 w-5 text-red-400 shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error al obtener el estado
                </h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {orderStatus && (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    currentStatus.type === "success"
                      ? "border-green-400 bg-green-50"
                      : currentStatus.type === "error"
                      ? "border-red-400 bg-red-50"
                      : currentStatus.type === "warning"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-blue-400 bg-blue-50"
                  }`}
                >
                  <div className="flex">
                    <currentStatus.icon
                      className={`h-5 w-5 ${
                        currentStatus.type === "success"
                          ? "text-green-400"
                          : currentStatus.type === "error"
                          ? "text-red-400"
                          : currentStatus.type === "warning"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }`}
                    />
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">
                        {currentStatus.title}
                      </h3>
                      <div className="mt-2 text-sm">
                        <p>{currentStatus.message}</p>
                        {currentStatus.action && (
                          <p className="mt-2 font-medium">
                            {currentStatus.action}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {showContactInfo && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">
                      Información de contacto:
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>
                        ✉️ Email:
                        <a
                          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          {"contacto@gmail.com"}
                        </a>
                      </li>
                      <li>
                        📞 Teléfono:
                        <a
                          href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          {"1111111111"}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {!isFinalState && currentStatus.showProgress && (
                  <div className="mt-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="h-5 w-5 text-blue-500" />
                      <span>Tiempo estimado: 2-5 minutos</span>
                    </div>
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2 animate-pulse"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                )}

                {/* ... (mantener Countdown y botón de reintento) ... */}
                {showCountdown && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Próxima actualización automática
                        </p>
                        <p className="text-sm text-gray-500">
                          Te notificaremos si hay cambios
                        </p>
                      </div>
                      <Countdown
                        key={attempt}
                        interval={currentInterval}
                        onTimeout={handleTimeout}
                      />
                    </div>
                  </div>
                )}

                {!orderStatus.final && attempt >= nextIntervals.length && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <button
                      onClick={() => {
                        setAttempt(0);
                        fetchOrderStatus();
                      }}
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                      disabled={loading}
                    >
                      <ArrowPathIcon className="h-5 w-5 mr-2" />
                      Actualizar estado
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <OrderSummary cart={orderStatus.cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
