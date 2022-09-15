<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Countries as ModelsCountries;
use Illuminate\Http\Request;

class Countries extends Controller
{

    public function create(Request $request)
    {
        try {
            $request->validate([
                'name'  => 'required|string|min:4|max:40',
                'ISO'   => 'required|string|min:3|max:3'
            ]);

            $country = ModelsCountries::create([
                'name'  => $request->name,
                'ISO'   => $request->ISO
            ]);

            $country->save();

            return response()->json('Created', 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant create', $e], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name'  => 'string|min:4|max:40',
                'ISO'   => 'string|min:3|max:3'
            ]);

            $country = ModelsCountries::find($id);

            $request->name ? $country->name = $request->name : false;
            $request->ISO ? $country->ISO = $request->ISO : false;

            $country->save();

            return response()->json('Updated', 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant update', $e], 500);
        }
    }

    public function index()
    {
        try {
            $countries = ModelsCountries::all();

            return response()->json($countries, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function find($id)
    {
        try {
            $country = ModelsCountries::find($id);

            return response()->json($country, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function findAirlines($id)
    {
        try {
            $airlines = ModelsCountries::find($id)->airlines;

            return response()->json($airlines, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get data', $e], 500);
        }
    }

    public function delete($id)
    {
        try {
            $country = ModelsCountries::find($id);

            $country->delete();

            return response()->json('Deleted', 202);
        } catch (\Throwable $e) {
            return response()->json(['Cant delete content', $e], 400);
        }
    }
}
