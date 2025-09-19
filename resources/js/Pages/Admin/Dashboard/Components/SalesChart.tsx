import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { SalesData } from '@/types/admin-dashboard';

const { Title, Text } = Typography;

const SalesChart: React.FC<{ data: SalesData[] }> = ({ data }) => {

    const maxSales = Math.max(...data.map(d => d.sales));

    return (
        <Card
            title="Sales Overview"
            extra={
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#52c41a' }}>
                    <ArrowUpOutlined />
                    <Text type="success">+12.5%</Text>
                </div>
            }
        >
            <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
                Monthly sales performance
            </Text>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.map((item) => (
                    <div key={item.month} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 32, fontSize: 14, fontWeight: 500, color: '#666' }}>
                            {item.month}
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                                style={{
                                    flex: 1,
                                    height: 8,
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                                        borderRadius: 4,
                                        width: `${(item.sales / maxSales) * 100}%`,
                                        transition: 'width 1s ease-out',
                                    }}
                                />
                            </div>
                            <div style={{ width: 64, textAlign: 'right', fontSize: 14, fontWeight: 500 }}>
                                ${(item.sales / 1000).toFixed(0)}k
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default SalesChart;
