export const  processSizeGuide= (data) => {
    const result = data.result;
    const availableSizes = result.available_sizes;
    const sizeTables = result.size_tables;
    
    const sizeGuide = [];

    // Inicializar el array con los objetos de las tallas
    availableSizes.forEach(size => {
        sizeGuide.push({ size });
    });

    // Iterar sobre cada tabla de tallas
    sizeTables.forEach(table => {
        table.measurements.forEach(measurement => {
            measurement.values.forEach(value => {
                
                // Encontrar el objeto correspondiente a la talla en el array sizeGuide
                const sizeObject = sizeGuide.find(s => s.size === value.size);

                // Añadir la medida al objeto correspondiente
                sizeObject[measurement.type_label.toLowerCase()] = value.value;
            });
        });
    });
    return sizeGuide;
}