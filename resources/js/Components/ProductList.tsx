import React from 'react';
import ProductCard from './ProductCard';

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
    onAddToCart: (productId: number) => void;
};

export default function ProductList({ products, onAddToCart }: ProductListProps) {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Products</h3>
                <button className="relative inline-flex items-center p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                    <span className="ml-2">Cart</span>
                </button>
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
