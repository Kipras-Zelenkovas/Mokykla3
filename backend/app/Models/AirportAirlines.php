<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AirportAirlines extends Model
{
    use HasFactory;

    protected $table = 'airport_airlines';

    protected $fillable = ['airports_id', 'airlines_id'];
}
