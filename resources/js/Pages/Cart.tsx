import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

type CartItemData = {
    id: string;
    title: string;
    quantity: number;
    price: string;
}

const Cart: React.FC = () => {
    const { data, setData, post, errors, reset } = useForm({
        cart: [] as CartItemData[],
    });
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartItems(parsedCart);
            setData('cart', parsedCart);
        }
    }, []);

    const handleQuantityChange = (id: string, quantity: number) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity,
                      }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            setData('cart', updatedItems);
            return updatedItems;
        });
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            setData('cart', updatedItems);
            return updatedItems;
        });
    };

    const handleCheckout = () => {
        // Post cart data to the server
        post('/checkout', {
            onSuccess: () => {
                alert('Checkout successful!');
                setCartItems([]); // Clear cart
                localStorage.removeItem('cart'); // Clear localStorage
                reset(); // Reset useForm state
            },
            onError: (error) => {
                console.error('Checkout failed:', error);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    E-commerce Cart
                </h2>
            }
        >
            <Head title="Cart" />
            <div className="flex justify-center py-12">
                <div className="w-full max-w-2xl bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Shopping Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-600 dark:text-gray-400">Your cart is empty</p>
                    ) : (
                        <>
                            <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded"
                                >
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Price: ${item.price}
                                        </p>
                                        <div className="flex items-center mt-2 space-x-2">
                                            <label
                                                htmlFor={`quantity-${item.id}`}
                                                className="text-sm text-gray-600 dark:text-gray-400"
                                            >
                                                Quantity:
                                            </label>
                                            <input
                                                id={`quantity-${item.id}`}
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        Math.max(1, parseInt(e.target.value) || 1)
                                                    )
                                                }
                                                className="w-16 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between mt-6">
                            <p className="text-md font-medium text-gray-800 dark:text-gray-200">Subtotal: ${cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</p>
                            <button 
                                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button> 
                        </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Cart;
