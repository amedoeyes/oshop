<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Requests\AuthUpdatePasswordRequest;
use App\Http\Requests\AuthUpdateRequest;
use App\Http\Resources\AuthLoginResource;
use App\Http\Resources\AuthShowUserResource;
use App\Models\Role;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        $request->validated();

        $roleId = Role::where('name', 'user')->first()->id;

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId
        ]);

        return response()->json([
            'message' => 'User created successfully',
        ]);
    }

    public function login(AuthLoginRequest $request)
    {
        $request->validated();

        if (Auth::once($request->only('email', 'password'))) {
            return new AuthLoginResource(auth()->user());
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function show()
    {
        return new AuthShowUserResource(auth()->user());
    }

    public function update(AuthUpdateRequest $request, User $user)
    {
        $request->validated();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function updatePassword(AuthUpdatePasswordRequest $request, User $user)
    {
        $request->validated();

        $user->update([
            'password' => bcrypt($request->new_password),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'User logged out successfully',
        ]);
    }
}
