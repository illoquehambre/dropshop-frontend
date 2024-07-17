'use client';
'use client';
import { useState, useEffect } from 'react';
import { Tabs, Tab } from '@nextui-org/react';

const SizeSelector = ({ onSelect, sizes }) => {
    if (!sizes || sizes.length === 0) {
        console.error('sizes must have at least one element');
        return null;
    }

    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    useEffect(() => {
        if (selectedSize) {
            onSelect(selectedSize);
        }
    }, [selectedSize, onSelect]);

    const handleSelectionChange = (key) => {
        setSelectedSize(key);
    };

    // Transformar sizes en un arreglo de objetos para la prop items
    const sizeItems = sizes.map((size) => ({ key: size, label: size }));

    return (
        <Tabs
            aria-label="Size Options"
            selectedKey={selectedSize}
            defaultSelectedKey={sizes[0]}
            onSelectionChange={handleSelectionChange}
            items={sizeItems}
            size="lg"
            variant="light"
            color="primary"
            radius="full"
        >
            {(item) => (
                <Tab key={item.key} title={item.label}>
                    
                </Tab>
            )}
        </Tabs>
    );
};

export default SizeSelector;
   