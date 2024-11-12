import React, { useEffect, useState, useRef } from 'react'
import DataTable from '@/Components/DataTable'
import AdminLayout from '@/Layouts/AdminLayout'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ProductData = {
    id: number,
    title: string,
    slug: string,
    image: string,
    description: string,
    price: string,
    published: boolean,
    updated_at: string
}

type ProductsProps = {
    products: ProductData[]
}

const Index: React.FC = () => {
    const { products } = usePage<PageProps<ProductsProps>>().props;
    const [loading, setLoading] = useState(true);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [productsData, setProductsData] = useState<ProductData[]>([]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (file: string) => (
                <img
                    src={`/${file}`}
                    alt="Product Image"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
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
            render: (text: string, record: ProductData) => (
                <Button onClick={() => console.log(record)}>Edit</Button>
            ),
        },
    ]
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, put, post, errors, reset } = useForm({
        title: '',
        image: null as File | null,
        description: '',
        price: '',
        published: false,
    });

    const showAddModal = () => {
        setData({ title: '', image: null, description: '', price: '', published: false });
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

         /** Reset file input for image */
         if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        setLoading(true);
        setProductsData(products);
        setLoading(false);
    }, [products]);

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center">
                <h1 className='my-10'>Products List</h1>
                <Button
                    type="primary"
                    style={{ marginRight: 10 }}
                    onClick={showAddModal}
                >
                    Add Product
                </Button>
                </div>
                <DataTable
                    columns={columns}
                    dataSource={productsData}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />

                <Modal
                    title="Add Product"
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
