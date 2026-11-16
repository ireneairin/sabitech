<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sala extends Model
{
    protected $table = 'sala';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'aforo',
        'ubicacion'
    ];

    // Una sala tiene MUCHAS charlas
    // 2º parámetro = la columna de la tabla charla que apunta a esta sala (id_sala)
    public function charlas(): HasMany
    {
        return $this->hasMany(Charla::class, 'id_sala');
    }
}
