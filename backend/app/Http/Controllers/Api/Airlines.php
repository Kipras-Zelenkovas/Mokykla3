<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airlines as ModelsAirlines;
use Illuminate\Http\Request;

class Airlines extends Controller
{
    public function create(Request $request)
    {
        try {
            $request->validate([
                'name'          => 'required|string|min:6|max:30',
                'countries_id'  => 'required|string',
            ]);

            $airline = ModelsAirlines::create([
                'name'          => $request->name,
                'countries_id'  => $request->countries_id
            ]);

            $airline->save();

            return response()->json('Ok', 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant create', $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name'          => 'string|min:6|max:30',
                'countries_id'  => 'string'
            ]);

            $airline = ModelsAirlines::find($id);

            $request->name ? $airline->name = $request->name : false;
            $request->countries_id ? $airline->countries_id = $request->countries_id : false;

            $airline->save();

            return response()->json('Updated', 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant update', $e], 400);
        }
    }

    public function index()
    {
        try {
            $airlines = ModelsAirlines::all();

            return response()->json($airlines, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function find($id)
    {
        try {
            $airline = ModelsAirlines::find($id);

            return response()->json($airline, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cnat get data', $e], 500);
        }
    }

    public function findAirports($id)
    {
        try {
            $airports = ModelsAirlines::find($id)->airports;

            return response()->json($airports, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function findCountry($id)
    {
        try {
            $country = ModelsAirlines::find($id)->countries;

            return response()->json($country, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function delete($id)
    {
        try {
            $airline = ModelsAirlines::find($id);

            $airline->delete();

            return response()->json('Secceed', 202);
        } catch (\Throwable $e) {
            return response()->json(['Cant delete content', $e], 500);
        }
    }
}
