import { Select, Table, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Col, Descriptions, Row, Typography } from "antd";

import { PageProps } from '@/types';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { OrderData, OrderItem } from '@/types/order';

import "react-toastify/dist/ReactToastify.css";
import { OrderStatus } from '@/Utils/Constants/Order';
import { useState } from 'react';

const { Title } = Typography;

const Details = () => {
    const { order } = usePage<PageProps<{ order: OrderData }>>().props;
    const [status, setStatus] = useState(order.status);

    const rowsData = [
        {
            title: "Product Name",
            dataIndex: ["product", "title"],
            key: "productName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",
            dataIndex: ["product", "price"],
            key: "unitPrice",
            render: (value: string) => `$${Number(value).toFixed(2)}`
        },
        {
            title: "Subtotal",
            dataIndex: "unit_price",
            key: "subtotal",
            render: (value: string) => `$${Number(value).toFixed(2)}`
        },
    ];

    const handleUpdate = () => {
        router.put(
            route("admin.orders.update", order.id),
            { status },
            {
                onSuccess: () => {
                    toast.success("Order status updated successfully!");
                },
                onError: () => {
                    toast.error("Failed to update order status.");
                }
            }
        );
    };

    return (
        <AdminLayout>
            <div className="px-6 py-10">
                <Title level={3}>Order Details</Title>

                <Row gutter={[24, 24]}>
                    {/* Order Summary */}
                    <Col xs={24} md={12}>
                        <Card title="Order Summary" bordered>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
                                <Descriptions.Item label="Total Price">${order.total_price}</Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    <div className="flex items-center gap-3">
                                        <Select
                                            value={status}
                                            style={{ width: 160 }}
                                            onChange={(value) => setStatus(value)}
                                            options={[
                                                { value: OrderStatus.PENDING, label: OrderStatus.PENDING },
                                                { value: OrderStatus.COMPLETE, label: OrderStatus.COMPLETE },
                                                { value: OrderStatus.CANCEL, label: OrderStatus.CANCEL },
                                            ]}
                                        />
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="Created At">
                                    {new Date(order.created_at).toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Updated At">
                                    {new Date(order.updated_at).toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Created By">{order.created_by}</Descriptions.Item>
                                {order.updated_by && (
                                    <Descriptions.Item label="Updated By">{order.updated_by}</Descriptions.Item>
                                )}
                            </Descriptions>
                            <Button
                                type="primary"
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </Card>
                    </Col>

                    {/* Customer Info */}
                    <Col xs={24} md={12}>
                        <Card title="Customer Information" bordered>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Name">
                                    {order.order_details.first_name} {order.order_details.last_name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">{order.order_details.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{order.order_details.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address">
                                    {order.order_details.address}
                                    {order.order_details.address2 && `, ${order.order_details.address2}`}
                                </Descriptions.Item>
                                <Descriptions.Item label="City">{order.order_details.city}</Descriptions.Item>
                                <Descriptions.Item label="State">{order.order_details.state}</Descriptions.Item>
                                <Descriptions.Item label="Zip Code">{order.order_details.zipcode}</Descriptions.Item>
                                <Descriptions.Item label="Country Code">{order.order_details.country_code}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
                {/* Order Items */}
                <div className="mt-10 bg-white shadow-md rounded-2xl p-6 border">
                    <h2 className="text-xl font-medium mb-4">Order Items</h2>
                    {order.order_items && order.order_items.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table
                                columns={rowsData}
                                dataSource={order.order_items}
                                rowKey={(_: OrderItem, index?: number) => index ?? ""}
                            />
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
