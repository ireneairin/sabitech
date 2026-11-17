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
            'ubicacion' => 'Valencia'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Sala de Innovación',
            'aforo' => 60,
            'ubicacion' => 'Valencia'
        ]);

        Sala::firstOrCreate([
            'nombre' => 'Sala Business',
            'aforo' => 40,
            'ubicacion' => 'Valencia'
        ]);
    }
}
