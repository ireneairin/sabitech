<?php

namespace Database\Seeders;

use App\Models\Charla;
use App\Models\Sala;
use Illuminate\Database\Seeder;

class CharlaSeeder extends Seeder
{
    public function run(): void
    {
        Charla::create([
            'nombre' => 'Inteligencia Artificial y futuro',
            'descripcion' => 'Charla sobre la inteligencia artificial y sus aplicaciones en el mundo actual.',
            'ponente' => 'Carlos Martínez',
            'categoria' => 'IA',
            'fecha' => '2027-02-15',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Sala Principal')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Desarrollo Web Moderno',
            'descripcion' => 'Introducción a las tecnologías actuales del desarrollo de aplicaciones web.',
            'ponente' => 'Laura García',
            'categoria' => 'Web',
            'fecha' => '2027-02-15',
            'hora_inicio' => '11:30',
            'hora_fin' => '12:30',
            'id_sala' => Sala::where('nombre', 'Sala de Innovación')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Emprendimiento Tecnológico',
            'descripcion' => 'Cómo desarrollar una idea de negocio relacionada con la tecnología.',
            'ponente' => 'David López',
            'categoria' => 'Business',
            'fecha' => '2027-02-16',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Sala Business')->firstOrFail()->id,
        ]);
    }
}
