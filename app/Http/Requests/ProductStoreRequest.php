<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        return $user->hasRole('admin') || $user->hasRole('vendor');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'brand' => 'required|string',
            'price' => 'required|numeric',
            'discount' => 'required|numeric',
            'stock' => 'required|numeric',
            'thumbnail' => 'required|image',
            'images' => 'required|array|min:1',
            'images.*' => 'required|image',
            'category' => 'required|string|exists:categories,name',
        ];
    }
}
