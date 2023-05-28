<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdatePasswordRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request['role'];

        $users = User::query();

        if ($role) {
            $users->whereHas('role', function ($query) use ($role) {
                $query->where('name', $role);
            });
        }

        return UserIndexResource::collection($users->get());
    }

    public function show(User $user)
    {
        return new UserShowResource($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $request->validated();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function updatePassword(UserUpdatePasswordRequest $request, User $user)
    {
        $request->validated();

        $user->update([
            'password' => bcrypt($request->new_password),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
