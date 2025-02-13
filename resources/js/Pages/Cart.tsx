import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

type CartItemData = {
    id: string;
    title: string;
    quantity: number;
    price: string;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartItems(parsedCart);
        }
    }, []);

    useEffect(() => {
        setTotalPrice(cartItems.reduce(
            (acc, item) => acc + parseFloat(item.price) * item.quantity,
            0
        ));
    }, [cartItems]);

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
            return updatedItems;
        });
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cart" />
            <div className="flex flex-col items-center justify-center mt-5 space-y-6">
                <div className="w-full max-w-2xl bg-gray shadow-md rounded-lg p-6 my-5">
                    <h2 className="text-2xl font-bold my-5 text-gray-900">Shopping Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-400">Your cart is empty</p>
                    ) : (
                        <>
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded"
                                    >
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-900">
                                                Price: ${item.price}
                                            </p>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <label
                                                    htmlFor={`quantity-${item.id}`}
                                                    className="text-sm text-gray-900"
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
                                <p className="text-md font-medium text-gray-900">
                                    Subtotal: ${totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-between mt-10">
                        <button
                            className="px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded"
                            onClick={() => {
                                router.visit("/dashboard")
                            }}
                        >
                            Continue Shopping
                        </button>

                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
                            onClick={() => router.visit('/checkout')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Cart;
