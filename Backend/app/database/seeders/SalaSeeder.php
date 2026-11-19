<?php

namespace Database\Seeders;

use App\Models\Sala;
use Illuminate\Database\Seeder;

class SalaSeeder extends Seeder
{
    public function run(): void
    {
        Sala::firstOrCreate([
            'nombre' => 'Sala Ada Lovelace',
            'aforo' => 120,
            'ubicacion' => 'Planta baja'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Sala Principal',
            'aforo' => 100,
            'ubicacion' => 'Planta baja'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Sala de Innovación',
            'aforo' => 60,
            'ubicacion' => '1a planta'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Sala Business',
            'aforo' => 40,
            'ubicacion' => '1a planta'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Lab Business 501',
            'aforo' => 40,
            'ubicacion' => '2a planta'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Aula Tech 302',
            'aforo' => 50,
            'ubicacion' => '2a planta'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Auditorio Salud & Bio',
            'aforo' => 80,
            'ubicacion' => 'Planta baja'
        ]);
    }
}
