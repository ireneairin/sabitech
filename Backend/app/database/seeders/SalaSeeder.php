<?php

namespace Database\Seeders;

use App\Models\Sala;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalaSeeder extends Seeder
{
    use WithoutModelEvents;
    
    public function run(): void
    {
        Sala::create([
            'nombre' => 'Sala Ada Lovelace',
            'aforo' => 120,
            'ubicacion' => 'Planta baja',
        ]);
    }
}