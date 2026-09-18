<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $categories = DB::table('categories')->get();

    return response()->json([
        'data' => $categories
    ], 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

       try {

        $name = $request->name;

        $exists = DB::table('categories')
            ->where('name', $name)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Category already exists'
            ], 409);
        }

        DB::table('categories')->insert([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Category created successfully',
            'data' => [
                'name' => $name,
            ],
        ], 201);

    } catch (\Exception $e) {

        return response()->json([
            'message' => 'Something went wrong',
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
    public function show(Categories $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categories $categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categories $categories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categories)
    {
        //
    }
}
