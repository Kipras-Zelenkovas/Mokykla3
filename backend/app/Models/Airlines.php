<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airlines extends Model
{
    use HasFactory;

    protected $table = 'airlines';

    protected $fillable = ['name', 'countries_id', 'created_at', 'updated_at'];

    public function airports()
    {
        return $this->belongsToMany(Airports::class, 'airport_airlines', 'airlines_id', 'airports_id')
            ->withTimestamps();
    }

    public function countries()
    {
        return $this->belongsTo(Countries::class);
    }
}
