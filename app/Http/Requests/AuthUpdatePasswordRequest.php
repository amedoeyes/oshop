<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AuthUpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'old_password' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $user = auth()->user();

                    if (!Auth::guard('web')->attempt(['email' => $user->email, 'password' => $value])) {
                        $fail('The old password does not match.');
                    }
                }
            ],
            'new_password' => [
                'required',
                'confirmed',
                Password::defaults()
            ],
        ];
    }
}