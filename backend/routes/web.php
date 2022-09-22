<?php

use App\Http\Controllers\Api\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('user')->group(function () {
    Route::get('/role', [User::class, 'getRole']);
    Route::post('/register', [User::class, 'register'])->middleware('guest');
    Route::post('/login', [User::class, 'login'])->middleware('guest');
    Route::post('/logout', [User::class, 'logout'])->middleware('auth:sanctum');
});
