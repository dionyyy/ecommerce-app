import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { OrderData } from '@/types/order';
import { OrderStatus } from '@/Utils/Constants/Order';

const RecentOrders: React.FC<{ orders: OrderData[] }> = ({ orders }) => {
    const getStatusColor = (status: string) => {
        const colors = {
            [OrderStatus.COMPLETE]: 'success',
            [OrderStatus.PENDING]: 'processing',
            [OrderStatus.CANCEL]: 'warning',
        };
        return colors[status as keyof typeof colors] || 'default';
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
            key: 'customer_name',
            render: (text: string, record: OrderData) => {
                const { first_name, last_name } = record.order_details;
                return `${first_name} ${last_name}`;
            }
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Amount',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (total_price: number) => `$${total_price.toFixed(2)}`,
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
