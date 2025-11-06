<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
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
        return Inertia::render('Admin/Dashboard/Dashboard', [
            'metrics' => $this->getMetricSummary(),
            'sales' => $this->getMonthlySalesData(),
            'orders' => Order::with(['orderDetails', 'orderItems.product'])->latest()->take(5)->get(),
        ]);
    }

    private function getMetricSummary(): array
    {
        $now = Carbon::now();

        // Current Month Range
        $start = $now->copy()->startOfMonth();
        $end = $now->copy()->endOfMonth();

        // Previous Month Range
        $prevStart = $now->copy()->subMonth()->startOfMonth();
        $prevEnd = $now->copy()->subMonth()->endOfMonth();

        // Current month metrics
        $currentRevenue = Order::whereBetween('created_at', [$start, $end])->sum('total_price');
        $currentOrders = Order::whereBetween('created_at', [$start, $end])->count();
        $currentProducts = Product::whereBetween('created_at', [$start, $end])->count();
        $currentCustomers = Customer::count();

        // Previous month metrics
        $prevRevenue = Order::whereBetween('created_at', [$prevStart, $prevEnd])->sum('total_price');
        $prevOrders = Order::whereBetween('created_at', [$prevStart, $prevEnd])->count();
        $prevProducts = Product::whereBetween('created_at', [$prevStart, $prevEnd])->count();
        $prevCustomers = Customer::count();

        // Helper to calculate change %
        $calculateChange = function ($current, $previous) {
            if ($previous == 0) {
                return [
                    'change' => $current > 0 ? 100 : 0,
                    'type' => $current > 0 ? 'positive' : 'neutral'
                ];
            }

            $diff = $current - $previous;
            $percentage = round(($diff / $previous) * 100, 2);

            return [
                'change' => abs($percentage),
                'type' => $percentage > 0 ? 'positive' : ($percentage < 0 ? 'negative' : 'neutral')
            ];
        };

        return [
            'total_revenue_this_month' => [
                'value' => $currentRevenue,
                ...$calculateChange($currentRevenue, $prevRevenue)
            ],
            'total_orders_this_month' => [
                'value' => $currentOrders,
                ...$calculateChange($currentOrders, $prevOrders)
            ],
            'total_products_this_month' => [
                'value' => $currentProducts,
                ...$calculateChange($currentProducts, $prevProducts)
            ],
            'total_customers' => [
                'value' => $currentCustomers,
                ...$calculateChange($currentCustomers, $prevCustomers)
            ]
        ];
    }

    private function getMonthlySalesData(): array
    {
        $rawSales = Order::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as ym, SUM(total_price) as sales')
            ->where('created_at', '>=', Carbon::now()->subMonths(5)->startOfMonth())
            ->groupBy('ym')
            ->orderBy('ym')
            ->pluck('sales', 'ym');

        $period = collect();
        $start = Carbon::now()->subMonths(5)->startOfMonth();
        $end = Carbon::now()->startOfMonth();

        while ($start <= $end) {
            $ym = $start->format('Y-m');
            $period->push([
                'month' => $start->format('M'),
                'sales' => (int) ($rawSales[$ym] ?? 0),
            ]);
            $start->addMonth();
        }

        return $sales = $period->toArray();
    }
}
