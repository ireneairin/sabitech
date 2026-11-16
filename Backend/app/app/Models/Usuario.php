<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Usuario extends Authenticatable
{
    protected $table = 'usuario';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'apellido',
        'password',
        'ciudad',
        'email',
        'telefono',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'fecha_registro' => 'datetime',
        ];
    }

    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'id_usuario');
    }

    public function charlas(): BelongsToMany
    {
        return $this->belongsToMany(
            Charla::class,
            'asiste',
            'id_usuario',
            'id_charla'
        );
    }
}
