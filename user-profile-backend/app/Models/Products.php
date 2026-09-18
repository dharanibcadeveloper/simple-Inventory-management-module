<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
     protected $fillable = [
        'category_id',
        'product_name',
        'sku',
        'price',
        'stock_quantity',
    ];
}
