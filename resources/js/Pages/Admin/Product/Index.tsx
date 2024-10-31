import DataTable from '@/Components/DataTable'
import AdminLayout from '@/Layouts/AdminLayout'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

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
            render: (text: string) => (
                <img
                    src={text}
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ProductData) => (
                <Button onClick={() => console.log(record)}>Edit</Button>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true);
        setProductsData(products);
        setLoading(false);
    }, [products]);

    return (
        <AdminLayout>
            <div>
                <div>
                <h1 className='my-10'>Products List</h1>
                <Button type="primary" style={{ marginRight: 10 }}>
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
            </div>
        </AdminLayout>
    )
}

export default Index
