<?php

namespace Database\Seeders;

use App\Models\Acceso;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class AccesoSeeder extends Seeder
{
    // Solo hay UNA fila por usuario (acceso.id_usuario es único) y no todos han entrado
    public function run(): void
    {
        Acceso::create([
            'fecha_hora' => '2026-11-16 08:30:00',
            'id_usuario' => Usuario::where('email', 'admin@example.com')->firstOrFail()->id,
        ]);

        Acceso::create([
            'fecha_hora' => '2026-11-16 09:15:00',
            'id_usuario' => Usuario::where('email', 'irene@example.com')->firstOrFail()->id,
        ]);

        Acceso::create([
            'fecha_hora' => '2026-11-16 10:05:00',
            'id_usuario' => Usuario::where('email', 'ana@example.com')->firstOrFail()->id,
        ]);

        Acceso::create([
            'fecha_hora' => '2026-11-14 19:20:00',
            'id_usuario' => Usuario::where('email', 'marc@example.com')->firstOrFail()->id,
        ]);
    }
}
