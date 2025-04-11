import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { toast, ToastContainer } from 'react-toastify';
import AdminLayout from '@/Layouts/AdminLayout'
import DataTable from '@/Components/DataTable'

type OrderData = {
    id: number;
    total_price: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number | null;
    order_details: OrderDetails
};

type OrderDetails = {
    id: number;
    order_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    address2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country_code: string;
    created_at: string;
    updated_at: string;
};

type OrdersProps = {
    orders: OrderData[]
}

const Index: React.FC = () => {
    const { orders } = usePage<PageProps<OrdersProps>>().props;
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrdersData] = useState<OrderData[]>([]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'customer_name',
            render: (text: string, record: OrderData) => {
                const { first_name, last_name } = record.order_details;
                return `${first_name} ${last_name}`;
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: OrderData) => (
                <Button onClick={() => router.visit(`/orders/${record.id}`)}>View Details</Button>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        setOrdersData(orders);
        setLoading(false);
    }, [orders]);

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className='my-10'>orders List</h1>
                </div>
                <DataTable
                    columns={columns}
                    dataSource={ordersData}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            </div>
            <ToastContainer />
        </AdminLayout>
    )
}

export default Index;
