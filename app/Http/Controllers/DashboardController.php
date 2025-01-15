<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $customer = auth()->user()->customer()->with('addresses')->first();

        return Inertia::render('Dashboard', [
            'products' => Product::all(),
            'customer' => $customer,
        ]);
    }

    public function getProducts(): JsonResponse
    {
        return response()->json([
            'products' => Product::all()
        ]);
    }

    public function showWelcomePage(): Response
    {
        return Inertia::render('Welcome', [
            'products' => Product::all(),
        ]);
    }

    public function showCartPage(): Response
    {
        return Inertia::render('Cart');
    }

    public function showCheckoutPage(): Response
    {
        return Inertia::render('Checkout');
    }
}
