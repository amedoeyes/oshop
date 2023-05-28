<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleIndexResource;
use App\Http\Resources\RoleShowResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return RoleIndexResource::collection(Role::all());
    }

    public function show(Role $role)
    {
        return new RoleShowResource($role);
    }

    public function store(RoleRequest $request)
    {
        $request->validated();

        $role = Role::create([
            'name' => $request['name'],
        ]);

        return response()->json(['message' => 'Role created successfully']);
    }

    public function update(Role $role, RoleRequest $request)
    {
        $request->validated();

        $role->update([
            'name' => $request['name'],
        ]);

        return response()->json(['message' => 'Role updated successfully']);
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json(['message' => 'Role deleted successfully']);
    }
}