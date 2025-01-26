<?php

namespace App\Models;

use App\Enums\Categories;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
            'rating' => 'float',
            'category' => Categories::class,
        ];
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'product_id');
    }
}
