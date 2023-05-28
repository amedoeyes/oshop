<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'brand' => $this->brand,
            'vendor' => $this->user->only('id', 'name'),
            'price' => $this->price,
            'discount' => $this->discount,
            'stock' => $this->stock,
            'rating' => $this->rating,
            'thumbnail' => asset(Storage::url($this->thumbnail)),
            'category' => $this->category->name,
            'images' => $this->images->map(function ($image) {
                return asset(Storage::url($image->url));
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
