<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductDeleteRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request['search'];
        $category = $request['category'];
        $minPrice = $request['min_price'];
        $maxPrice = $request['max_price'];
        $rating = $request['rating'];

        $products = Product::query();

        if ($search) {
            $products->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('brand', 'like', '%' . $search . '%');
            });
        }

        if ($category) {
            $products->whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            });
        }

        if ($minPrice) {
            $products->where('price', '>=', $minPrice);
        }

        if ($maxPrice) {
            $products->where('price', '<=', $maxPrice);
        }

        if ($rating) {
            $products->where('rating', '>=', $rating);
        }

        return ProductResource::collection($products->get());
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function indexUserProducts(Request $request)
    {
        return ProductResource::collection($request->user()->products->reverse());
    }

    public function store(ProductStoreRequest $request)
    {
        $request->validated();

        $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        $category = Category::where('name', $request['category'])->first();

        $product = Product::create([
            'name' => $request['name'],
            'description' => $request['description'],
            'brand' => $request['brand'],
            'price' => $request['price'],
            'discount' => $request['discount'],
            'stock' => $request['stock'],
            'thumbnail' => $thumbnailPath,
            'user_id' => auth()->id(),
            'category_id' => $category->id,
        ]);

        $images = $request['images'];

        foreach ($images as $image) {
            $imagePath = $image->store('images', 'public');

            $product->images()->create(['url' => $imagePath]);
        }

        return new ProductResource($product);
    }

    public function update(ProductUpdateRequest $request, Product $product)
    {
        $request->validated();

        $category = Category::where('name', $request['category'])->first();

        $product->update([
            'name' => $request['name'] ?? $product->name,
            'description' => $request['description'] ?? $product->description,
            'brand' => $request['brand'] ?? $product->brand,
            'price' => $request['price'] ?? $product->price,
            'discount' => $request['discount'] ?? $product->discount,
            'stock' => $request['stock'] ?? $product->stock,
            'rating' => $request['rating'] ?? $product->rating,
            'category_id' => $category->id ?? $product->category_id,
        ]);

        if ($request->hasFile('thumbnail')) {
            Storage::disk('public')->delete($product->thumbnail);
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');

            $product->update(['thumbnail' => $thumbnailPath]);
        }

        if ($request->hasFile('images')) {
            $existingImages = $product->images;
            $product->images()->delete();

            foreach ($existingImages as $image) {
                Storage::disk('public')->delete($image->url);
            }

            $updatedImages = [];

            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $product->images()->create(['url' => $imagePath]);
                $updatedImages[] = $imagePath;
            }


            $product->update(['images' => $updatedImages]);
        }

        return new ProductResource($product);
    }

    public function destroy(ProductDeleteRequest $request, Product $product)
    {
        Storage::disk('public')->delete($product->thumbnail);

        $images = $product->images;

        foreach ($images as $image) {
            Storage::disk('public')->delete($image->url);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
