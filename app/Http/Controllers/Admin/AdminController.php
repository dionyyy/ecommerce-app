<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Admin/Dashboard', [
            'user' => Auth::user(),
            'orders' => Order::all()->count(),
            'products' => Product::all()->count(),
            'customers' => Customer::all()->count()
        ]);
    }
}
