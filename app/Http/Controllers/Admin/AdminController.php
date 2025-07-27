<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Show admin login form
     */
    public function showLogin(): Response
    {
        return Inertia::render('Admin/Login');
    }

    /**
     * Authenticate Admin
     */
    public function login(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'isAdmin' => true])) {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['email' => 'Invalid credentials provided.'])->withInput();
    }

    /**
     * Show Admin dashboard
     */
    public function index(): Response
    {
        $now = Carbon::now();
        $start = $now->copy()->startOfMonth();
        $end = $now->copy()->endOfMonth();

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'user' => Auth::user(),
            'total_revenue_this_month' => Order::whereBetween('created_at', [$start, $end])
                ->sum('total_price'),
            'total_orders_this_month' => Order::whereBetween('created_at', [$start, $end])
                ->count(),
            'total_products_this_month' => Product::whereBetween('created_at', [$start, $end])
                ->count(),
            'total_customers' => Customer::count(),
        ]);
    }
}
