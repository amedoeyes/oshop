<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartItemStoreRequest;
use App\Http\Requests\CartItemUpdateRequest;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function store(CartItemStoreRequest $request)
    {
        $request->validated();

        $user = auth()->user();

        if ($user->cart->contains($request->product_id)) {
            $cartItem = $user->cart->find($request->product_id);

            $cartItem->update([
                'quantity' => $request->quantity
            ]);

            return response()->json(['message' => 'Item updated']);
        }

        CartItem::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'Item added to cart']);
    }

    public function update(CartItemUpdateRequest $request, CartItem $cartItem)
    {
        $request->validated();

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'Item updated']);
    }

    public function destroy(CartItem $cartItem)
    {
        $user = auth()->user();

        if ($cartItem->user_id === $user->id) {
            $cartItem->delete();

            return response()->json(['message' => 'Item deleted']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function destroyAll(Request $request)
    {
        $user = auth()->user();

        $user->cart()->delete();

        return response()->json(['message' => 'Cart emptied']);
    }
}
