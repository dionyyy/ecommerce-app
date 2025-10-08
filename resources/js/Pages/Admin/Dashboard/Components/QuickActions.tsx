import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { BookUser, ListOrdered, Plus, UserPlus } from 'lucide-react';
import { router } from '@inertiajs/react';

const QuickActions: React.FC = () => {
    const actions = [
        {
            icon: <Plus />,
            label: 'Add Product',
            color: '#1890ff',
            onClick: () => router.visit("/admin/products"),
        },
        {
            icon: <ListOrdered />,
            label: 'Order List',
            color: '#52c41a',
            onClick: () => router.visit("/admin/orders"),
        },
        {
            icon: <UserPlus />,
            label: 'Add Customer',
            color: '#722ed1',
            onClick: () => router.visit("/admin/customers"),
        },
        {
            icon: <BookUser />,
            label: 'Add User',
            color: '#fa8c16',
            onClick: () => router.visit("/admin/users"),
        },
    ];

    return (
        <Card title="Quick Actions">
            <Row gutter={[12, 12]}>
                {actions.map((action, index) => (
                    <Col span={12} key={index}>
                        <Button
                            type="primary"
                            size="large"
                            icon={action.icon}
                            onClick={action.onClick}
                            style={{
                                width: '100%',
                                height: 80,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                backgroundColor: action.color,
                                borderColor: action.color,
                            }}
                        >
                            <span style={{ fontSize: 12, fontWeight: 500 }}>{action.label}</span>
                        </Button>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default QuickActions;
