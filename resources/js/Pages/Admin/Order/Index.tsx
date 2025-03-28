import React, { useEffect, useState, useRef } from 'react'
import DataTable from '@/Components/DataTable'
import AdminLayout from '@/Layouts/AdminLayout'
import { PageProps } from '@/types'
import { router, useForm, usePage } from '@inertiajs/react'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Categories } from '@/Utils/Constants/Transactions'

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
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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
    ]
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, errors, reset } = useForm({
        title: '',
        image: null as File | null,
        description: '',
        price: '',
        published: false,
        category: '',
        ratings: '',
    });

    const showAddModal = () => {
        setData({ title: '', image: null, description: '', price: '', published: false, category: '', ratings: '' });
        setIsAddModalVisible(true);
    };

    const handleAddProduct = () => {
        post(route('admin.product.store'), {
            onSuccess: () => {
                reset();
                toast.success('Product added successfully!');
                setIsAddModalVisible(false);

                /** Reset file input for image */
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            }
        });
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
        reset();
    };

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
                    <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={showAddModal}
                    >
                        Add Order
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    dataSource={ordersData}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />

                <Modal
                    title="Add Order"
                    open={isAddModalVisible}
                    onOk={handleAddProduct}
                    onCancel={handleCancel}
                    okText="Add"
                    cancelText="Cancel"
                    width={1000}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Title"
                            validateStatus={errors.title && 'error'}
                            help={errors.title}
                        >
                            <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            validateStatus={errors.image && 'error'}
                            help={errors.image}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    setData('image', file);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            validateStatus={errors.description && 'error'}
                            help={errors.description}
                        >
                            <Input.TextArea
                                placeholder="Enter description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            validateStatus={errors.price && 'error'}
                            help={errors.price}
                        >
                            <Input
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ratings"
                            validateStatus={errors.ratings && 'error'}
                            help={errors.ratings}
                        >
                            <Input
                                value={data.ratings}
                                onChange={(e) => setData('ratings', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            validateStatus={errors.category && 'error'}
                            help={errors.category}
                        >
                            <Select
                                options={Object.entries(Categories).map(([key, value]) => ({ label: key, value: value }))}
                                value={data.category}
                                onChange={(value) => setData('category', value)}
                            />
                        </Form.Item>
                        <Checkbox
                            checked={data.published}
                            onChange={(e) => setData('published', e.target.checked)}
                        >
                            Published
                        </Checkbox>
                    </Form>
                </Modal>
            </div>
            <ToastContainer />
        </AdminLayout>
    )
}

export default Index
