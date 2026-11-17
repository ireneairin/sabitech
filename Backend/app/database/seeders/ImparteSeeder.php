<?php

namespace Database\Seeders;

use App\Models\Charla;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class ImparteSeeder extends Seeder
{
    public function run(): void
    {
        $charlaIA = Charla::where('nombre', 'Inteligencia Artificial y futuro')->firstOrFail();
        $charlaWeb = Charla::where('nombre', 'Desarrollo Web Moderno')->firstOrFail();
        $charlaEmprendimiento = Charla::where('nombre', 'Emprendimiento Tecnológico')->firstOrFail();

        // Los mismos ponentes que aparecen en la columna de texto "ponente" de CharlaSeeder
        $carlos = Usuario::where('email', 'carlos@example.com')->firstOrFail();
        $laura = Usuario::where('email', 'laura@example.com')->firstOrFail();
        $david = Usuario::where('email', 'david@example.com')->firstOrFail();

        // attach() añade parejas (charla, usuario) a la tabla intermedia "imparte"
        $charlaIA->ponentes()->attach($carlos->id);
        $charlaWeb->ponentes()->attach($laura->id);
        $charlaEmprendimiento->ponentes()->attach($david->id);
    }
}
