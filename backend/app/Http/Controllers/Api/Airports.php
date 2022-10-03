<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airports as ModelsAirports;
use Illuminate\Http\Request;

class Airports extends Controller
{

    public function create(Request $request)
    {

        try {

            $request->validate([
                'name'      => 'required|string|min:6|max:30',
                'country'   => 'required|string|min:3|max:30',
                'latitude'  => 'required|string|min:4|max:10',
                'longitude' => 'required|string|min:4|max:10',
                'airlines'  => 'required|min:1'
            ]);

            $airport = ModelsAirports::create([
                'name'      => $request->name,
                'country'   => $request->country,
                'latitude'  => $request->latitude,
                'longitude' => $request->longitude
            ]);

            $airport->save();

            $airport->airlines()->sync($request->airlines);

            return response()->json('Ok', 201);
        } catch (\Throwable $e) {
            return response()->json(['Not ok', $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name'      => 'string|min:6|max:30',
                'country'   => 'string|min:3|max:30',
                'latitude'  => 'string|min:4|max:10',
                'longitude' => 'string|min:4|max:10',
                'airlines'  => 'min:1'
            ]);

            $airport = ModelsAirports::find($id);

            $request->name ? $airport->name = $request->name : false;
            $request->country ? $airport->country = $request->country : false;
            $request->latitude ? $airport->latitude = $request->latitude : false;
            $request->longitude ? $airport->longitude = $request->longitude : false;

            $airport->save();

            $airport->airlines()->sync($request->airlines);

            return response()->json('ok', 201);
        } catch (\Throwable $e) {
            return response()->json(['Cant update', $e->getMessage()], 402);
        }
    }

    public function index()
    {
        try {
            $airports = ModelsAirports::all();

            return response()->json($airports, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get airports', $e], 400);
        }
    }

    public function find($id)
    {
        try {
            $airport = ModelsAirports::find($id);

            return response()->json($airport, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 400);
        }
    }

    public function findAirlines($id)
    {
        try {
            $airlines = ModelsAirports::find($id)->airlines;

            return response()->json($airlines, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 400);
        }
    }

    public function delete($id)
    {
        try {
            $airport = ModelsAirports::find($id);

            $airport->delete();

            return response()->json('Succeed', 202);
        } catch (\Throwable $e) {
            return response()->json(['Cant delete content', $e], 500);
        }
    }
}
