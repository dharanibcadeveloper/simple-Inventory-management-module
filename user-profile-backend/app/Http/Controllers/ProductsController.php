<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = DB::table('products')
        ->join('categories', 'products.category_id', '=', 'categories.id')
        ->select('products.*', 'categories.name as category_name')
        ->get();

        return response()->json(['data' => $products]);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {

        $validated = $request->validate([
            'category_id' => 'required',
            'product_name' => 'required',
            'sku' => 'required|unique:products,sku',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
        ]);

        DB::table('products')->insert([
            'category_id' => $validated['category_id'],
            'product_name' => $validated['product_name'],
            'sku' => $validated['sku'],
            'price' => $validated['price'],
            'stock_quantity' => $validated['stock_quantity'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Product created successfully',
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            'message' => 'Please check the required fields.',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {

        return response()->json([
            'message' => 'Something went wrong.',
            'error' => $e->getMessage(),
        ], 500);
    }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id )
    {
         $product = DB::table('products')
        ->where('id', $id)
        ->first();

    return response()->json([
        'data' => $product
    ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
          $validated = $request->validate([
        'category_id' => 'required',
        'product_name' => 'required',
        'sku' => ['required',  Rule::unique('products', 'sku')->ignore($id)],
        'price' => 'required|numeric',
        'stock_quantity' => 'required|integer',
    ]);

    DB::table('products')
        ->where('id', $id)
        ->update([
            'category_id' => $validated['category_id'],
            'product_name' => $validated['product_name'],
            'sku' => $validated['sku'],
            'price' => $validated['price'],
            'stock_quantity' => $validated['stock_quantity'],
            'updated_at' => now(),
        ]);

    return response()->json([
        'message' => 'Product updated successfully',
    ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
         $deleted = DB::table('products')
        ->where('id', $id)
        ->delete();

    if (!$deleted) {
        return response()->json([
            'message' => 'Product not found'
        ], 404);
    }

    return response()->json([
        'message' => 'Product deleted successfully'
    ], 200);
    }
}
