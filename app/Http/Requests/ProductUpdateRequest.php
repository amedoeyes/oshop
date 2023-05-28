<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        $product = $this->route('product');

        return $user->hasRole('admin') || $product->user->id === $user->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'brand' => 'nullable|string',
            'price' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'rating' => 'nullable|decimal:1|between:0,5',
            'thumbnail' => 'nullable|image',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image',
            'category' => 'nullable|string|exists:categories,name',
        ];
    }
}
