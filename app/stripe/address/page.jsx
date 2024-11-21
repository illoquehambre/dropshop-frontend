'use client';

import { useCart } from '@/app/hooks/useCart';
import AddressForm from '@/components/stripe/AddressForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

//Este página deberá recibir datos sobre los productos o capturarlos
//Para evitar manipulacones sobre precios de productos:
//1-Se recibirán solos los  id de producto y su cantidad
//2-Se realizará una petición a printful para traer los datos de dichos productos
//3-Se mostraran los productos y resumen de carrito a un lado
//4-Se realizará una 
const AddressPage = () => {

  //1-trae del local storage el carrito y el idDraft
  // Estado local para guardar `idDraft` y `carrito`
  const [products, setProducts] = useState([]);
  const { cart, idDraft, setIdDraft } = useCart()
  const [loading, setLoading] = useState(false)
  // Función para cargar los datos iniciales desde localStorage

  //TIENE QUE LLAMAR A LA VARIANTE 
  //NO AL PRODUCTO
  //ES EL ID DE LA VARIANTE EL QU TENEMOS
  const getProducts = async (id) => {
    return fetch(`/api/user/variant/${id}`)
      .then(response => {
        if (!response.ok) {
          console.error('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data:', error);

      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {

    if (cart && cart.length > 0) {
      console.log("stored:", cart);

      cart.map(async p => {
        const completeProduct = await getProducts(p.external_id)
        setProducts(...products, { product: completeProduct, quantity: p.quantity })
        //NO SE SI ESTO FUNCIONA BIEN

      })
    }

  }, [cart]);






  const handleAddressSubmitted = (address, name) => {
    console.log('Dirección capturada:', address);
    console.log("Nombre: ", name);
    // se llama al server para hacer el draft de los datos de envio y os productos
  };

  return (
    <Elements stripe={stripePromise}>
      <div>
        <h1>Checkout</h1>
        <AddressForm onAddressSubmitted={handleAddressSubmitted} />
      </div>
    
    </Elements>
  );
};

export default AddressPage;
