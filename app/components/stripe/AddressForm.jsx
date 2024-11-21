'use client';

import { AddressElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const AddressForm = ({ onAddressSubmitted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  return (
    <div>
      <form >
        <h2>Enter Your Shipping Address</h2>
        <AddressElement
          options={{
            mode: 'billing', // Opciones: "shipping" o "billing"
          }}
          onChange={(event) => {
           
            
            if (event.complete) {
              // Extract potentially complete address              
              const address = event.value.address;
              const name = event.value.name
              onAddressSubmitted(address, name )
              
            }
          }}
        />
        {/**
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Address'}
        </button>
         */}
      </form>
    </div>
  );
};

export default AddressForm;
