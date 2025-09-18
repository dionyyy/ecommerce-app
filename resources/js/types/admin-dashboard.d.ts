export type MetricItem = {
    value: number;
    change: number;
    type: 'positive' | 'negative' | 'neutral';
};

export type Metrics = {
    total_revenue_this_month: MetricItem;
    total_orders_this_month: MetricItem;
    total_products_this_month: MetricItem;
    total_customers: MetricItem;
};

export type SalesData = {
    month: string;
    sales: number;
}
