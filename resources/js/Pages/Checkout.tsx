import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CartItemData = {
    id: string;
    title: string;
    quantity: number;
    price: string;
};

const Checkout: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const { data, setData, post, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cart: cartItems,
    });

    useEffect(() => {
        setData('cart', cartItems);
    }, [cartItems]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout', {
            onSuccess: () => {
                toast.success('Order placed successfully!');
                reset();
                setCartItems([]);
                localStorage.removeItem('cart');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Checkout" />
            <ToastContainer />
            <div className="flex flex-col items-center justify-center mt-5 space-y-6">
                <div className="w-full max-w-2xl bg-gray shadow-md rounded-lg p-6 my-5">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 ">Shipping Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">First Name</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.first_name && <p className="text-red-600">{errors.first_name}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">Last Name</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.last_name && <p className="text-red-600">{errors.last_name}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.address && <p className="text-red-600">{errors.address}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">City</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.city && <p className="text-red-600">{errors.city}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">State</label>
                            <input
                                type="text"
                                value={data.state}
                                onChange={(e) => setData('state', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.state && <p className="text-red-600">{errors.state}</p>}
                        </div>
                        <div>
                            <label className="mt-3 block text-sm font-medium text-gray-600 ">Zip Code</label>
                            <input
                                type="text"
                                value={data.zip}
                                onChange={(e) => setData('zip', e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.zip && <p className="text-red-600">{errors.zip}</p>}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-800  mt-10">Cart Summary</h3>
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item.id} className="border-b border-gray-200 py-2">
                                        <p className='text-white'>{item.title} (x{item.quantity}) - ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit" className="px-4 py-2 mt-10 bg-blue-600 text-white rounded">
                            Complete Checkout
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Checkout;
