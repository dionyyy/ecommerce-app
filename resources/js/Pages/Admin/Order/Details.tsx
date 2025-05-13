import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { OrderData, OrderDetails } from '@/types/order';
import { PageProps } from '@/types';
import { ToastContainer } from 'react-toastify';
import { usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const Details = () => {
    const { order } = usePage<PageProps<{ order: OrderData }>>().props;

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className='my-10'>Order Details</h1>
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>
    )
}

export default Details;
