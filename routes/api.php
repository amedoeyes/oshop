<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    //auth
    Route::get('auth/me', [AuthController::class, 'show']);
    Route::put('auth/update', [AuthController::class, 'update']);
    Route::put('auth/update_password', [AuthController::class, 'updatePassword']);
    Route::Post('auth/logout', [AuthController::class, 'logout']);

    //products
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/user', [ProductController::class, 'indexUserProducts']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    //cart items
    Route::post('/cart_items', [CartItemController::class, 'store']);
    Route::put('/cart_items/{cart_item}', [CartItemController::class, 'update']);
    Route::delete('/cart_items/{cart_item}', [CartItemController::class, 'destroy']);
    Route::delete('/cart_items', [CartItemController::class, 'destroyAll']);

    //admin
    Route::middleware('role:admin')->group(function () {

        //roles
        Route::get('/roles', [RoleController::class, 'index']);
        Route::get('/roles/{role}', [RoleController::class, 'show']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::put('/roles/{role}', [RoleController::class, 'update']);
        Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

        //users
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::put('/users/{user}/password', [UserController::class, 'updatePassword']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        //categories
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    });

});

//auth
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

//categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

//products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
