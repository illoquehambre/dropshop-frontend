'use client';
import React, { useState } from 'react';

// Ejemplo de datos de variantes
const variants = [
  { id: 1, size: 'S', color: 'Red' },
  { id: 2, size: 'S', color: 'Blue' },
  { id: 3, size: 'M', color: 'Red' },
  { id: 4, size: 'M', color: 'Green' },
  { id: 5, size: 'L', color: 'Blue' },
  { id: 6, size: 'L', color: 'Green' },
  // ... otras variantes
];

const ProductFilter = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Obtener todas las tallas disponibles
  const availableSizes = [...new Set(variants.map(variant => variant.size))];

  // Obtener colores disponibles según la talla seleccionada
  const availableColors = selectedSize
    ? [...new Set(variants.filter(variant => variant.size === selectedSize).map(variant => variant.color))]
    : [...new Set(variants.map(variant => variant.color))];

  // Obtener tallas disponibles según el color seleccionado
  const filteredSizes = selectedColor
    ? [...new Set(variants.filter(variant => variant.color === selectedColor).map(variant => variant.size))]
    : availableSizes;

  return (
    <div className='text-blue-400'>
      <h2>Filtrar por Talla</h2>
      <div>
        {availableSizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{ backgroundColor: selectedSize === size ? 'lightgray' : 'white' }}
          >
            {size}
          </button>
        ))}
      </div>

      <h2>Colores Disponibles para la Talla Seleccionada</h2>
      <div>
        {availableColors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: selectedColor === color ? 'lightgray' : 'white' }}
          >
            {color}
          </button>
        ))}
      </div>

      <h2>Filtrar por Color</h2>
      <div>
        {availableColors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: selectedColor === color ? 'lightgray' : 'white' }}
          >
            {color}
          </button>
        ))}
      </div>

      <h2>Tallas Disponibles para el Color Seleccionado</h2>
      <div>
        {filteredSizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{ backgroundColor: selectedSize === size ? 'lightgray' : 'white' }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
