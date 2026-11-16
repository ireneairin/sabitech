<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserva extends Model
{
    protected $table = 'reserva';

    public $timestamps = false;

    // "qr" lo genera el servidor (no el cliente) y "estado" cambia al cancelar la reserva;
    // por eso están aquí: el controlador los pasa a create() / update()
    protected $fillable = [
        'estado',
        'fecha_reserva',
        'qr',
        'id_usuario',
    ];

    // Una reserva pertenece a UN usuario
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
