import ProductList from '@/Components/ProductList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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

export default function Dashboard() {
    const { products } = usePage<PageProps<ProductsProps>>().props;

    const handleAddToCart = (productId: number) => {
        console.log(`Added product ${productId} to cart`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    E-commerce Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <ProductList products={products} onAddToCart={handleAddToCart} />
            </div>
        </AuthenticatedLayout>
    );
}
