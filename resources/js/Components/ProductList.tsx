import React from 'react';
import ProductCard from './ProductCard';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

type ProductData = {
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string;
    price: string;
    published: boolean;
    updated_at: string;
};

type ProductListProps = {
    products: ProductData[];
    onAddToCart: (product: ProductData) => void;
};

export default function ProductList({ products, onAddToCart }: ProductListProps) {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Products</h3>
                <Link
                    href="/cart"
                    className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    <FaShoppingCart className="mr-2" />
                    Go to Cart
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}
