<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Charla extends Model
{
    protected $table = 'charla';
    public $timestamps = false; //no tenemos created_at/updated_at

    //datos que el usuario puede rellenar
    protected $fillable = [
        'nombre',
        'descripcion',
        'ponente',
        'categoria',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'id_sala'
    ];

    //una charla pertenece a una sala (1, n)
    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class, 'id_sala');
    }

    // tabla intermedia (n, n) entre charlas y usuarios (asistentes)
    protected function asistentes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'asiste', 'id_charla', 'id_usuario');
    }

    // tabla intermedia (n, n) entre charlas y usuarios (gestiona)
    protected function gestores(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'gestiona', 'id_charla', 'id_usuario');
    }

    // tabla intermedia (n, n) entre charlas y usuarios (imparte)
    protected function ponentes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'imparte', 'id_charla', 'id_usuario');
    }

}