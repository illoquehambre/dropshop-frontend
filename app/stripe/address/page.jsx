'use client';

import Forms from '@/components/payment/Forms'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartSummary } from '@/components/payment/CartSummary'
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/app/hooks/useCart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const appearance = {
  theme: 'bubblegum',
  variables: {
    fontWeightNormal: '500',
    borderRadius: '2px',
    colorPrimary: '#f360a6',
    tabIconSelectedColor: '#fff',
    gridRowSpacing: '16px'
  }
}
const AddressPage = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  const { cart, idDraft, setIdDraft } = useCart();
  const shippingCosts = 5.00;
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false); // Estado para controlar el formulario visible

  useEffect(() => {

    const fetchOrUpdatePaymentIntent = async () => {
      try {
        if (paymentIntentId && idDraft) {
          // Si ya existe un PaymentIntent, actualízalo
          await updatePaymentIntent({ paymentIntentId});
        } else {
          // Si no existe, créalo
           await createPaymentIntent();
        }
      } catch (error) {
        console.error("Error handling payment intent:", error);
      }
    };
  
    if (cart.length > 0 ) {
      fetchOrUpdatePaymentIntent();
    }
  }, [cart, idDraft]);

  
  

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/order/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotalAmount(),
          currency: 'EUR',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId)
      } else {
        console.error('Error creating PaymentIntent:', data);
      }
    } catch (error) {
      console.error('Unexpected error creating PaymentIntent:', error);
    }
  };

  const updatePaymentIntent = async (paymentId) => {
    console.log("ENTRA EN EL metodo");
    try {
      const response = await fetch('/api/order/payment-intent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotalAmount(),
          paymentId,
          idDraft,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Confirmed updates in PaymentIntent:');
      } else {
        console.error('Error updating PaymentIntent:', data);
      }
    } catch (error) {
      console.error('Unexpected error updating PaymentIntent:', error);
    }
  };


  const calculateTotalAmount = () => {
    const subtotal = cart.reduce(
      (total, product) => total + parseFloat(product.retail_price),
      0
    );
    const shipping = shippingCosts;
    const tax = 0.00; // Si tienes un cálculo dinámico de impuestos

    return (subtotal + shipping + tax).toFixed(2) * 100;
  };

  const handleAddressSubmitted = async (address, name) => {
   
    const recipient = setRecipient(address, name);
    const retail_costs = setRetailCosts();
    const items = setItems();
    const draft = {
      recipient,
      items,
      retail_costs
    };



    try {
      if (idDraft) {
        console.log("ENTRA EN EL if");
        await putDraft(draft);
      } else {
        console.log("ENTRA EN EL ELSE");
        
        await postDraft(draft);
      }
     
      
      // Al enviar la dirección, ocultamos el formulario de dirección y mostramos el de pago
      setIsAddressSubmitted(true);
    } catch (error) {
      console.error('Error processing draft:', error);
    }
  };

  const setRecipient = (address, name) => {
    return {
      name: name,
      address1: address.line1,
      address2: address.line2 || "",
      city: address.city || "",
      state_code: address.state || "",
      country_code: address.country || "",
      zip: address.postal_code || "",
    };
  };

  const setItems = () => {
    return cart.map((product) => ({
      sync_variant_id: product.id,
      quantity: product.quantity
    }));
  };

  const setRetailCosts = () => {
    return {
      currency: "EUR",
      subtotal: cart.reduce(
        (total, product) => total + parseFloat(product.retail_price),
        0
      ).toFixed(2),
      discount: "0.00",
      shipping: shippingCosts.toString(),
      tax: "0.00",
    };
  };

  const postDraft = async (payload) => {
    try {
      const response = await fetch("/api/order/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIdDraft(data.orderId);
      } else {
        console.error("Error creating order:", data);
        alert("Failed to create order.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An error occurred while creating the order.");
    }
  };

  const putDraft = async (payload) => {
    try {
      const updatedPayload = { ...payload, orderId: idDraft };

      const response = await fetch("/api/order/draft", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayload),
      });

      const data = await response.json();

      if (response.ok) {
      } else {
        console.error("Error updating order:", data);
        alert("Failed to update order.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An error occurred while updating the order.");
    }
  };

  return (
    <>
      <h1>Payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret,  }} appearance={appearance}>
          <div className="flex flex-col lg:flex-row justify-between mt-6 lg:mt-12 align-top">
            <Forms  isAddressSubmitted={isAddressSubmitted} handleAddressSubmitted={handleAddressSubmitted}></Forms>
            <CartSummary cart={cart} />
          </div>
        </Elements>
      )}
    </>
  );
};

export default AddressPage;
