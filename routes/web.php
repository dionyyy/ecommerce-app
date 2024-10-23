<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


/** Admin Routes */

Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.post');

Route::prefix('admin')->middleware('auth')->group(function() {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    /** USERS */
    Route::get('/users', [UserController::class, 'index'])->name('admin.user.index');
    Route::post('/users', [UserController::class, 'store'])->name('admin.user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.user.update');

    /** PRODUCTS */
    Route::get('/products', [ProductController::class, 'index'])->name('admin.product.index');
});

require __DIR__.'/auth.php';
