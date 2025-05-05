'use client';
import { PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe.js no está listo todavía. Intenta nuevamente.");
      return;
    }

    setIsLoading(true); 

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stripe/completion`,
        }
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("Ocurrió un error en el procesamiento del pago, por favor verifique correctamente los datos de su tarjeta e intentelo de nuevo."
            +" En caso de que este error persista contacte a soporte.");
        }
      } else if (paymentIntent.status === "succeeded") {
        setMessage("¡Pago completado con éxito!");
      }
    } catch (err) {
      setMessage("Error procesando el pago. Por favor intenta más tarde.");
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full ">
      <form id="payment-form" onSubmit={handleSubmit}>
        {/*<div className="mb-4">
          <LinkAuthenticationElement
            id="link-authentication-element"
            // Prefill the email field (optional):
            options={{ defaultValues: { email: "example@example.com" } }}
          />
        </div>*/}
        <div className="mb-4">
          <PaymentElement id="payment-element" />
        </div>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`btn btn-primary bg-cyan-500 w-full ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Procesando..." : "Pagar ahora"}
        </button>
        {message && (
          <div id="payment-message" className="mt-4 text-red-500">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
