<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Categories;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Laravel\Facades\Image;

class ProductController extends Controller
{
    /**
     * Display product table
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Product/Index', [
            'products' => Product::where('published', true)->get(),
        ]);
    }

    /**
     * Save product model
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image',
            'description' => 'required|string|max:255',
            'price' => 'required',
        ]);

        $product = Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'price' => $request->price,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
            'published' => $request->published,
            'ratings' => $request->ratings,
            'category' => Categories::of($request->category),
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $name = time() . '.' . $file->getClientOriginalExtension();
            $upload_path = 'product/';
            $image = Image::read($file)->resize(240, 200);
            $image_url = $upload_path . $name;
            $image->save($image_url);

            $product->image = $image_url;
            $product->save();
        }

        return back()->with('success', 'Product created successfully.');
    }
}
