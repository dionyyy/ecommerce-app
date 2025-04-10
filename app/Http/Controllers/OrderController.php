<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return Inertia::render('orders.index', compact('orders'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'required|numeric',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required|numeric',
        ]);

        // try {
        DB::transaction(function () use ($request) {
            $total_price = array_reduce($request->cart, function ($carry, $item) {
                return $carry + ($item['price'] * $item['quantity']);
            }, 0);

            $order = Order::create([
                'total_price' => $total_price,
                'status' => 'pending',
                'created_by' => Auth::id(),
            ]);

            OrderDetail::create([
                'order_id' => $order->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => Auth::user()->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zipcode' => $request->zip,
                'country_code' => 'PH',
            ]);

            collect($request->cart)->each(function ($item) use ($order) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                ]);
            });

            $customer = Customer::updateOrCreate(
                ['user_id' => Auth::id()],
                [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'phone' => $request->phone,
                    'user_id' => Auth::id(),
                    'created_by' => Auth::id()
                ]
            );

            CustomerAddress::updateOrCreate(['customer_id' => $customer->id], [
                'customer_id' => $customer->id,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zipcode' => $request->zip,
                'country_code' => 'PH',
            ]);
        });

        return back()->with('success', 'Order successfully.');
        // } catch (Exception $e) {
        //     return back()->with('error', 'Error processing order.');
        // }
    }

    public function show(Order $order)
    {
        return view('orders.show', compact('order'));
    }

    public function edit(Order $order)
    {
        return view('orders.edit', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        return redirect()->route('orders.show', $order);
    }
}
