<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Charla extends Model
{
    protected $table = 'charla';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
        'ponente',
        'categoria',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'id_sala',
    ];

    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class, 'id_sala');
    }

    public function asistentes(): BelongsToMany
    {
        return $this->belongsToMany(
            Usuario::class,
            'asiste',
            'id_charla',
            'id_usuario'
        );
    }

    public function gestores(): BelongsToMany
    {
        return $this->belongsToMany(
            Usuario::class,
            'gestiona',
            'id_charla',
            'id_usuario'
        );
    }

    public function ponentes(): BelongsToMany
    {
        return $this->belongsToMany(
            Usuario::class,
            'imparte',
            'id_charla',
            'id_usuario'
        );
    }
}
