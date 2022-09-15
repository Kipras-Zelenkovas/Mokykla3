<?php

use App\Http\Controllers\Api\Airlines;
use App\Http\Controllers\Api\Airports;
use App\Http\Controllers\Api\Countries;
use App\Http\Controllers\Api\MapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::prefix('/airport')->group(function () {
    Route::get('', [Airports::class, 'index']);
    Route::get('/{id}', [Airports::class, 'find']);
    Route::get('/airlines/{id}', [Airports::class, 'findAirlines']);
    Route::post('', [Airports::class, 'create']);
    Route::put('/{id}', [Airports::class, 'update']);
    Route::delete('/{id}', [Airports::class, 'delete']);
});

Route::prefix('/airline')->group(function () {
    Route::get('', [Airlines::class, 'index']);
    Route::get('/{id}', [Airlines::class, 'find']);
    Route::get('/airports/{id}', [Airlines::class, 'findAirports']);
    Route::get('/country/{id}', [Airlines::class, 'findCountry']);
    Route::post('', [Airlines::class, 'create']);
    Route::put('/{id}', [Airlines::class, 'update']);
    Route::delete('/{id}', [Airlines::class, 'delete']);
});

Route::prefix('/country')->group(function () {
    Route::get('', [Countries::class, 'index']);
    Route::get('/{id}', [Countries::class, 'find']);
    Route::get('/airlines/{id}', [Countries::class, 'findAirlines']);
    Route::post('', [Countries::class, 'create']);
    Route::put('/{id}', [Countries::class, 'update']);
    Route::delete('/{id}', [Countries::class, 'delete']);
});

Route::prefix('map')->group(function () {
    Route::get('', [MapController::class, 'getAirports']);
});