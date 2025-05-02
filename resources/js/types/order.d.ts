export type OrderData = {
    id: number;
    total_price: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number | null;
    order_details: OrderDetails
};

export type OrderDetails = {
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
