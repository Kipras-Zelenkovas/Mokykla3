<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airports extends Model
{
    use HasFactory;

    protected $table = 'airports';

    protected $fillable = ['name', 'country', 'latitude', 'longitude'];

    public function airlines()
    {
        return $this->belongsToMany(Airlines::class, 'airport_airlines', 'airports_id', 'airlines_id')
            ->withTimestamps();
    }
}
