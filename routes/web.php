<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'showWelcomePage'])->name('welcome');

/** User Routes */

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /** Cart Routes */
    Route::get('/cart', [DashboardController::class, 'showCartPage'])->name('cart');
    Route::post('/checkout', [OrderController::class, 'store'])->name('checkout');
});


/** Admin Routes */

Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.post');

Route::prefix('admin')->middleware('auth')->group(function() {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    /** USERS */
    Route::prefix('users')->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('admin.user.index');
        Route::post('/', [UserController::class, 'store'])->name('admin.user.store');
        Route::put('/{user}', [UserController::class, 'update'])->name('admin.user.update');
    });

    /** PRODUCTS */
    Route::prefix('products')->group(function() {
        Route::get('/', [ProductController::class, 'index'])->name('admin.product.index');
        Route::post('/', [ProductController::class, 'store'])->name('admin.product.store');
    });

    /**ORDERS */
    Route::apiResource('orders', OrderController::class);
});

require __DIR__.'/auth.php';
