<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airports;
use Illuminate\Http\Request;

class MapController extends Controller
{

    public function getAirports(Request $request)
    {
        try {
            $request->validate([
                'latitude' => 'required|string|min:4',
                'longitude' => 'required|string|min:4',
            ]);

            $airports = Airports::where([
                ['latitude', '<', (float)$request->latitude + 0.6],
                ['latitude', '>', (float)$request->latitude - 0.6],
                ['longitude', '<', (float)$request->longitude + 2],
                ['longitude', '>', (float)$request->longitude - 2],
            ])->get();

            return response()->json($airports, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    /**
     * lat +- 0.6
     * long +- 2
     * 
     * variable 
     */
}
