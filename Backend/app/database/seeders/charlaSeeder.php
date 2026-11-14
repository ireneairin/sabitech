<?php

namespace Database\Seeders;

use App\Models\Charla;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CharlaSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        //charla de prueba
        Charla::create([
            'nombre' => 'Prueba1',
            'descripcion' => 'Esto es una prueba',
            'ponente' => 'Alma',
            'categoria' => 'Tech',
            'fecha' => '2024-06-18',
            'hora_inicio' => '12:00',
            'hora_fin' => '13:00',
            'id_sala' => 1
        ]);
    }
}