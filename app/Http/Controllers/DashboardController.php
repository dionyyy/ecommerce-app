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
        return Inertia::render('Dashboard', [
            'products' => Product::all(),
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
}
