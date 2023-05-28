<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'parentCategories' => $this->getParents($this),
            'subcategories' => $this->getSubcategories($this->subcategories),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    private function getParents($category)
    {
        $parents = [];

        while ($category->parent_id != null) {
            $parent = Category::find($category->parent_id, ['id', 'name']);
            array_unshift($parents, $parent);
            $category = $parent;
        }

        return $parents;
    }

    private function getSubcategories($categories)
    {
        return $categories->map(function ($category) {
            return $category->only('id', 'name');
        });
    }

}