<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::with('subcategories')->whereNull('parent_id')->get();

        return CategoryResource::collection($categories);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function store(CategoryRequest $request)
    {
        $request->validated();

        $parent = Category::where('name', $request['parent'])->first();

        $category = Category::create([
            'name' => $request['name'],
            'parent_id' => optional($parent)->id,
        ]);

        return response()->json(['message' => 'Category created successfully']);
    }

    public function update(Category $category, CategoryRequest $request)
    {
        $request->validated();

        $parent = Category::where('name', $request['parent'])->first();

        $category->update([
            'name' => $request['name'],
            'parent_id' => optional($parent)->id,
        ]);

        return response()->json(['message' => 'Category updated successfully']);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}