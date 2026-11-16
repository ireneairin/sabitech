<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Usuario extends Model
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
        ];
    }

    // Un usuario tiene UN acceso (su último acceso). Es hasOne porque acceso.id_usuario es único
    public function acceso(): HasOne
    {
        return $this->hasOne(Acceso::class, 'id_usuario');
    }

    // Un usuario puede enviar MUCHAS consultas
    public function consultas(): HasMany
    {
        return $this->hasMany(Consulta::class, 'id_usuario');
    }

    // Un usuario puede tener MUCHAS reservas
    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'id_usuario');
    }

    // ---- N a N con charla (la misma relación vista desde el otro lado) ----
    // belongsToMany(modelo, tabla intermedia, clave de ESTE modelo, clave del OTRO modelo)

    public function charlasAsistidas(): BelongsToMany
    {
        return $this->belongsToMany(
            Charla::class,
            'asiste',
            'id_usuario',
            'id_charla'
        );
    }

    public function charlasGestionadas(): BelongsToMany
    {
        return $this->belongsToMany(
            Charla::class,
            'gestiona',
            'id_usuario',
            'id_charla'
        );
    }

    public function charlasImpartidas(): BelongsToMany
    {
        return $this->belongsToMany(
            Charla::class,
            'imparte',
            'id_usuario',
            'id_charla'
        );
    }
}
