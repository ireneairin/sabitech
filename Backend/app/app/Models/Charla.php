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

    // Una charla pertenece a UNA sala (la clave foránea id_sala está en esta tabla)
    public function sala(): BelongsTo
    {
        return $this->belongsTo(Sala::class, 'id_sala');
    }

    // ---- Relaciones N a N con usuario, a través de tablas intermedias ----
    // belongsToMany(modelo, tabla intermedia, clave de ESTE modelo, clave del OTRO modelo)

    // Usuarios que asisten a la charla (tabla "asiste")
    public function asistentes(): BelongsToMany
    {
        return $this->belongsToMany(
            Usuario::class,
            'asiste',
            'id_charla',
            'id_usuario'
        );
    }

    // Usuarios que gestionan la charla (tabla "gestiona")
    public function gestores(): BelongsToMany
    {
        return $this->belongsToMany(
            Usuario::class,
            'gestiona',
            'id_charla',
            'id_usuario'
        );
    }

    // Usuarios que imparten la charla (tabla "imparte")
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
