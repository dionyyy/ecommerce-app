<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'image' => $this->faker->imageUrl(640, 480, 'products', true),
            'image_mime' => 'image/jpeg',
            'image_size' => $this->faker->numberBetween(1000, 100000),
            'description' => $this->faker->paragraph(5),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'created_by' => 1,
            'updated_by' => 1,
            'published' => $this->faker->boolean(),
        ];
    }
}
