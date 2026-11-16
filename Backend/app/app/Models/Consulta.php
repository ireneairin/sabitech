<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consulta extends Model
{
    protected $table = 'consulta';

    public $timestamps = false;

    // "estado" va en la lista porque un gestor lo cambiará con update()
    // Al crear una consulta no se envía: MySQL le pone 'pendiente' por defecto
    protected $fillable = [
        'asunto',
        'email',
        'mensaje',
        'estado',
        'id_usuario',
    ];

    // Una consulta pertenece a UN usuario (el que la envió)
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
