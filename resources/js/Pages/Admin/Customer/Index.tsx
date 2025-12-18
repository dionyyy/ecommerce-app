import DataTable from '@/Components/DataTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomerData } from '@/types/customer';

type Props = {
    customers: CustomerData[];
};

const Index: React.FC = () => {
    const { customers } = usePage<PageProps<Props>>().props;
    const [loading, setLoading] = useState(true);
    const [customersData, setCustomersData] = useState<CustomerData[]>([]);

    useEffect(() => {
        setLoading(true);
        setCustomersData(customers);
        setLoading(false);
    }, [customers]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            render: (text: string, record: CustomerData) => {
                const { first_name, last_name } = record;
                return `${first_name} ${last_name}`;
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Registered Date',
            dataIndex: 'created_at',
            key: 'created_at',
        }
    ];

    return (
        <AdminLayout>
            <div>
                <DataTable
                    columns={columns}
                    dataSource={customersData}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            </div>
        </AdminLayout>
    );
};

export default Index;
