import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { OrderData } from '@/types/order';
import { PageProps } from '@/types';
import { ToastContainer } from 'react-toastify';
import { usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const Details = () => {
    const { order } = usePage<PageProps<{ order: OrderData }>>().props;

    return (
        <AdminLayout>
            <div className="px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border">
                        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium">Order ID:</span> {order.id}</p>
                            <p><span className="font-medium">Total Price:</span> ${order.total_price}</p>
                            <p><span className="font-medium">Status:</span> {order.status}</p>
                            <p><span className="font-medium">Created At:</span> {new Date(order.created_at).toLocaleString()}</p>
                            <p><span className="font-medium">Updated At:</span> {new Date(order.updated_at).toLocaleString()}</p>
                            <p><span className="font-medium">Created By:</span> {order.created_by}</p>
                            {order.updated_by && (
                                <p><span className="font-medium">Updated By:</span> {order.updated_by}</p>
                            )}
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border">
                        <h2 className="text-xl font-medium mb-4">Customer Information</h2>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium">Name:</span> {order.order_details.first_name} {order.order_details.last_name}</p>
                            <p><span className="font-medium">Email:</span> {order.order_details.email}</p>
                            <p><span className="font-medium">Phone:</span> {order.order_details.phone}</p>
                            <p><span className="font-medium">Address:</span> {order.order_details.address}{order.order_details.address2 && `, ${order.order_details.address2}`}</p>
                            <p><span className="font-medium">City:</span> {order.order_details.city}</p>
                            <p><span className="font-medium">State:</span> {order.order_details.state}</p>
                            <p><span className="font-medium">Zip Code:</span> {order.order_details.zipcode}</p>
                            <p><span className="font-medium">Country Code:</span> {order.order_details.country_code}</p>
                        </div>
                    </div>
                </div>
                {/* Order Items */}
                <div className="mt-10 bg-white shadow-md rounded-2xl p-6 border">
                    <h2 className="text-xl font-medium mb-4">Order Items</h2>
                    {order.order_items && order.order_items.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="border-b font-medium">
                                    <tr>
                                        <th className="px-4 py-2">Product Name</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Unit Price</th>
                                        <th className="px-4 py-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">{item.product.title}</td>
                                            <td className="px-4 py-2">{item.quantity}</td>
                                            <td className="px-4 py-2">${item.product.price}</td>
                                            <td className="px-4 py-2">
                                                ${item.unit_price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No order items available.</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>
    );
};

export default Details;
