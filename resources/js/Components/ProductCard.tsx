import React from 'react';

type ProductCardProps = {
    product: {
        id: number;
        title: string;
        slug: string;
        image: string;
        description: string;
        price: string;
        published: boolean;
        updated_at: string;
    };
    onAddToCart: (product: ProductCardProps["product"]) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img
                src={product.image || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.title}
            </h4>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${parseFloat(product.price).toFixed(2)}
                </span>
                <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
