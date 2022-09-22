<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Roles as ModelsRoles;
use Illuminate\Http\Request;

class Roles extends Controller
{

    public function create(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:12|string'
            ]);

            $role = ModelsRoles::create([
                'name'  => $request->name,
            ]);

            $role->save();

            return response()->json("Created", 200);
        } catch (\Throwable $e) {
            return response()->json(["Cant create", $e], 400);
        }
    }

    public function user(Request $request)
    {
        try {
            $roles = ModelsRoles::find($request->id);

            return response()->json($roles->users, 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant get users', $e], 400);
        }
    }
}
