<?php

namespace Database\Seeders;

use App\Models\Charla;
use App\Models\Reserva;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReservaSeeder extends Seeder
{
    // Estados de ejemplo: 'activa' y 'cancelada' (los mismos que ReservaController)
    // El QR debe ser único: Str::uuid() crea un identificador distinto cada vez
    public function run(): void
    {   
        // Ids de las charlas ya sembradas (CharlaSeeder debe ejecutarse antes)
        $charlas = Charla::orderBy('id')->pluck('id');

        Reserva::create([
            'estado' => 'activa',
            'fecha_reserva' => '2027-02-15 10:00:00',
            'qr' => (string) Str::uuid(),
            'id_usuario' => Usuario::where('email', 'ana@example.com')->firstOrFail()->id,
            'id_charla' => $charlas[0],
        ]);

        Reserva::create([
            'estado' => 'activa',
            'fecha_reserva' => '2027-02-15 11:30:00',
            'qr' => (string) Str::uuid(),
            'id_usuario' => Usuario::where('email', 'marc@example.com')->firstOrFail()->id,
            'id_charla' => $charlas[1 % $charlas->count()],
        ]);

        Reserva::create([
            'estado' => 'cancelada',
            'fecha_reserva' => '2027-02-16 10:00:00',
            'qr' => (string) Str::uuid(),
            'id_usuario' => Usuario::where('email', 'lucia@example.com')->firstOrFail()->id,
            'id_charla' => $charlas[0],
        ]);

        Reserva::create([
            'estado' => 'activa',
            'fecha_reserva' => '2027-02-16 10:00:00',
            'qr' => (string) Str::uuid(),
            'id_usuario' => Usuario::where('email', 'ana@example.com')->firstOrFail()->id,
            'id_charla' => $charlas[1 % $charlas->count()],
        ]);
    }
}
