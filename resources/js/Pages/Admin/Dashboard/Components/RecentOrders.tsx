import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Order {
    key: string;
    orderId: string;
    customer: string;
    product: string;
    amount: number;
    status: string;
    date: string;
}

const RecentOrders: React.FC = () => {
    const orders: Order[] = [
        {
            key: '1',
            orderId: '#ORD-001',
            customer: 'Sarah Johnson',
            product: 'Wireless Headphones',
            amount: 299.99,
            status: 'completed',
            date: '2024-01-15'
        },
        {
            key: '2',
            orderId: '#ORD-002',
            customer: 'Mike Chen',
            product: 'Smart Watch',
            amount: 399.99,
            status: 'processing',
            date: '2024-01-15'
        },
        {
            key: '3',
            orderId: '#ORD-003',
            customer: 'Emily Davis',
            product: 'Phone Case Set',
            amount: 49.99,
            status: 'shipped',
            date: '2024-01-14'
        },
        {
            key: '4',
            orderId: '#ORD-004',
            customer: 'Alex Rodriguez',
            product: 'Bluetooth Speaker',
            amount: 159.99,
            status: 'pending',
            date: '2024-01-14'
        },
        {
            key: '5',
            orderId: '#ORD-005',
            customer: 'Lisa Wang',
            product: 'Laptop Stand',
            amount: 89.99,
            status: 'completed',
            date: '2024-01-13'
        }
    ];

    const getStatusColor = (status: string) => {
        const colors = {
            completed: 'success',
            processing: 'processing',
            shipped: 'purple',
            pending: 'warning',
        };
        return colors[status as keyof typeof colors] || 'default';
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    <Button type="text" icon={<EditOutlined />} size="small" />
                    <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Recent Orders"
            extra={<Button type="link">View All</Button>}
        >
            <Table
                columns={columns}
                dataSource={orders}
                pagination={false}
                size="small"
            />
        </Card>
    );
};

export default RecentOrders;
