<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Product/Index', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'image',
            'description' => 'required|string|max:255',
            'price' => 'required',
        ]);

        Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'price' => $request->price,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
            'published' => $request->published
        ]);

        return back()->with('success', 'Product created successfully.');
    }
}
