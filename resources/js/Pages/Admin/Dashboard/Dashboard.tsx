import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import MetricCard from "./Components/MetricCard";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import type { Metrics, SalesData } from "@/types/admin-dashboard";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users
} from "lucide-react";
import { Col, Row } from "antd";
import SalesChart from "./Components/SalesChart";
import QuickActions from "./Components/QuickActions";

const Dashboard: React.FC = () => {
  const { metrics } = usePage<PageProps<{ metrics: Metrics }>>().props;
  const { sales } = usePage<PageProps<{ sales: SalesData[] }>>().props;

  const getChangeType = (value: number): "positive" | "negative" | "neutral" => {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "neutral";
  };

  const metricCards = [
    {
      title: "Total Revenue (This Month)",
      value: `$${metrics.total_revenue_this_month.value.toLocaleString()}`,
      change: `${metrics.total_revenue_this_month.change}%`,
      changeType: getChangeType(metrics.total_revenue_this_month.change),
      icon: DollarSign,
      color: "bg-blue-500"
    },
    {
      title: "Total Orders (This Month)",
      value: metrics.total_orders_this_month.value.toString(),
      change: `${metrics.total_orders_this_month.change}%`,
      changeType: getChangeType(metrics.total_orders_this_month.change),
      icon: ShoppingCart,
      color: "bg-green-500"
    },
    {
      title: "Total Products (This Month)",
      value: metrics.total_products_this_month.value.toString(),
      change: `${metrics.total_products_this_month.change}%`,
      changeType: getChangeType(metrics.total_products_this_month.change),
      icon: Package,
      color: "bg-orange-500"
    },
    {
      title: "Total Customers",
      value: metrics.total_customers.value.toString(),
      change: `${metrics.total_customers.change}%`,
      changeType: getChangeType(metrics.total_customers.change),
      icon: Users,
      color: "bg-purple-500"
    }
  ];

  return (
    <AdminLayout>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {metricCards.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <SalesChart data={sales} />
        </Col>
        <Col xs={24} lg={8}>
          <QuickActions />
        </Col>
      </Row>

      <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
    </AdminLayout>
  );
};

export default Dashboard;
