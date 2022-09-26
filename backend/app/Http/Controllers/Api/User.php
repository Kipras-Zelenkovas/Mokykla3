<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class User extends Controller
{

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name'      => 'required|min:5|max:20|string',
                'email'     => 'required|email:rfc,dns',
                'password'  => 'required|min:6|max:20|string',
                'roles_id'  => 'required|min:1'
            ]);

            $user = ModelsUser::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password),
                'roles_id'  => $request->roles_id
            ]);

            $user->save();

            return response()->json('Created', 200);
        } catch (\Throwable $e) {
            return response()->json(['Cant create', $e], 400);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email'     => 'required',
                'password'  => 'required'
            ]);

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();

                return response()->json([
                    'token' => $request->user()->createToken("API TOKEN")->plainTextToken,
                ], 200);
            }
        } catch (\Throwable $e) {
            return response()->json(["something went wrong", $e->getMessage()], 519);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            Auth::guard("web")->logout();

            $request->session()->invalidate();

            return response()->json("Logout successful");
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
        }
    }

    public function isAdmin()
    {
        try {
            if (Gate::allows('isAdmin')) {
                return response()->json([
                    'admin' => true
                ]);
            }

            return response()->json([
                'admin' => false
            ], 403);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 404);
        }
    }

    public function isLogged(){
        try {
            if(Auth::check()){
                return response()->json([
                    'logged'    => true
                ]);
            }

            return response()->json([
                'logged'    => false
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 401);
        }
    }
}
