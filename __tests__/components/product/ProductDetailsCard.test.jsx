import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetailsCard from '../../../app/components/product/ProductDetailsCard'; // Ajusta la ruta según tu estructura de carpetas

beforeAll(() => {
    // Mock de Snipcart
    const mockSnipcart = {
        events: {
            on: jest.fn((event, callback) => {
                // Simulate event listeners
            }),
            off: jest.fn(),
        },
        store: {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            getState: jest.fn(() => ({
                cart: {
                    items: {
                        items: [
                            { id: 'item1', uniqueId: 'uniqueItem1' }, // Ejemplo de objeto en items
                            { id: 'item2', uniqueId: 'uniqueItem2' }
                        ],
                    },
                    total: 0,
                    currency: 'USD',
                },
            })),
        },
        api: {
            cart: {
                items: {
                    items: [
                        { id: 'item1', uniqueId: 'uniqueItem1' }, // Ejemplo de objeto en items
                        { id: 'item2', uniqueId: 'uniqueItem2' }
                    ],
                    addItem: jest.fn(), // Mock adding an item to the cart
                    remove: jest.fn(), // Mock removing an item from the cart
                    clear: jest.fn(), // Mock clearing the cart
                },
            }, // Mock items in the cart

        },
        session: {
            getToken: jest.fn(() => 'mock-token'),
        },

    };

    global.Snipcart = mockSnipcart;

    global.fetch = jest.fn((url) => {

        if (url == '/api/user/sizeGuide/563') {
            return Promise.resolve({
                json: () =>
                    Promise.resolve({
                        result: {
                            size_tables: [
                                {
                                    image_url: 'http://example.com/size-chart.png',
                                    image_description: 'Size Chart',
                                    measurements: [
                                        {
                                            type_label: "Length",
                                            values: [
                                                {
                                                    size: "S",
                                                    value: "28"
                                                },
                                                {
                                                    size: "M",
                                                    value: "29"
                                                },
                                                {
                                                    size: "L",
                                                    value: "30"
                                                },
                                                {
                                                    size: "XL",
                                                    value: "31"
                                                },
                                                {
                                                    size: "2XL",
                                                    value: "32"
                                                },
                                                {
                                                    size: "3XL",
                                                    value: "33"
                                                },
                                                {
                                                    size: "4XL",
                                                    value: "34"
                                                },
                                                {
                                                    size: "5XL",
                                                    value: "35"
                                                }
                                            ]
                                        },
                                    ],
                                }
                            ],
                            available_sizes: [
                                "S",
                                "M",
                                "L",
                                "XL",
                                "2XL",
                                "3XL",
                                "4XL",
                                "5XL"
                            ],


                        }
                    })
            })
        } else {
            return Promise.resolve({
                json: () =>
                    Promise.resolve({
                        result: { availability_status: 'inactive' }
                    })
            })

        }



    }


    );
})


afterAll(() => {
    delete global.Snipcart;
});

describe('ProductDetailsCard', () => {


    // Datos de prueba
    const result = {
        sync_product: {
            name: 'Producto Test',
            description: 'Descripción del producto test',
            price: 100.00,
        },
        sync_variants: [
            {
                id: 4414723846,
                external_id: "666db23d84b836",
                size: 'S',
                color: 'Red',
                availability_status: 'active',
                retail_price: 100,
                product: {
                    variant_id: 14215,
                    product_id: 563,
                    image: "https://files.cdn.printful.com/products/563/14215_1643960187.jpg",
                    name: "Printful Men's Premium Pima Cotton T-Shirt (Black / XS)"
                },
                files: [{}, { preview_url: 'http://example.com/image.jpg', thumbnail_url: 'http://example.com/thumbnail.jpg' }]
            },
            {
                id: 4414723847,
                external_id: "666db23d84b8a9",
                size: 'M',
                color: 'Blue',
                availability_status: 'inactive',
                retail_price: 27.50,
                product: {
                    variant_id: 14216,
                    product_id: 563,
                    image: "https://files.cdn.printful.com/products/563/14215_1643960187.jpg",
                    name: "Printful Men's Premium Pima Cotton T-Shirt (Black / XS)"
                },
                files: [{}, { preview_url: 'http://example.com/image2.jpg', thumbnail_url: 'http://example.com/thumbnail2.jpg' }]
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe renderizar el componente con datos', async () => {
        render(<ProductDetailsCard result={result} />);

        await waitFor(() => {
            expect(screen.getByText('Producto Test')).toBeInTheDocument();
            expect(screen.getByText('100 €')).toBeInTheDocument();
        });
    })
    /*
        test('debe manejar el evento "item.added" de Snipcart y verificar disponibilidad', async () => {
            // Mock de datos del carrito
            mockSnipcart.store.getState.mockReturnValue({
                cart: {
                    items: {
                        items: [{ id: '1', uniqueId: 'unique-1' }],
                    },
                },
            });
    
            mockSnipcart.api.cart.items.remove.mockResolvedValue(undefined);
    
            // Renderizar el componente
            render(<ProductDetailsCard result={result} />);
    
            // Simular el evento de Snipcart
            mockSnipcart.events.on.mockImplementation((eventName, callback) => {
                if (eventName === 'item.added') {
                    callback();
                }
            });
    
            // Espera a que el evento se maneje y verifica el resultado
            await waitFor(() => {
                expect(mockSnipcart.api.cart.items.remove).toHaveBeenCalledWith('unique-1');
            });
        });
    
        test('debe manejar el evento "item.updated" de Snipcart y verificar disponibilidad', async () => {
            // Mock de datos del carrito
            mockSnipcart.store.getState.mockReturnValue({
                cart: {
                    items: {
                        items: [{ id: '2', uniqueId: 'unique-2' }],
                    },
                },
            });
    
            mockSnipcart.api.cart.items.remove.mockResolvedValue(undefined);
    
            // Renderizar el componente
            render(<ProductDetailsCard result={result} />);
    
            // Simular el evento de Snipcart
            mockSnipcart.events.on.mockImplementation((eventName, callback) => {
                if (eventName === 'item.updated') {
                    callback();
                }
            });
    
            // Espera a que el evento se maneje y verifica el resultado
            await waitFor(() => {
                expect(mockSnipcart.api.cart.items.remove).toHaveBeenCalledWith('unique-2');
            });
        });
    
        test('debe manejar el evento "summary.checkout_clicked" de Snipcart', () => {
            // Renderizar el componente
            render(<ProductDetailsCard result={result} />);
    
            // Simular el evento de Snipcart
            mockSnipcart.events.on.mockImplementation((eventName, callback) => {
                if (eventName === 'summary.checkout_clicked') {
                    callback();
                }
            });
    
            // Verifica que el evento sea registrado
            expect(mockSnipcart.events.on).toHaveBeenCalledWith('summary.checkout_clicked', expect.any(Function));
        });
    
        test('debe manejar el evento "cart.confirmed" de Snipcart', () => {
            const cartConfirmResponse = { success: true };
    
            // Renderizar el componente
            render(<ProductDetailsCard result={result} />);
    
            // Simular el evento de Snipcart
            mockSnipcart.events.on.mockImplementation((eventName, callback) => {
                if (eventName === 'cart.confirmed') {
                    callback(cartConfirmResponse);
                }
            });
    
            // Verifica que el evento sea registrado
            expect(mockSnipcart.events.on).toHaveBeenCalledWith('cart.confirmed', expect.any(Function));
        });
        */
});
