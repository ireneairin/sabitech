<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Acceso extends Model
{
    protected $table = 'acceso';

    public $timestamps = false;

    protected $fillable = [
        'fecha_hora',
        'id_usuario',
    ];

    // Un acceso pertenece a UN usuario (la clave foránea id_usuario está en esta tabla)
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
