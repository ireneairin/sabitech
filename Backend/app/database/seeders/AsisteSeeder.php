<?php

namespace Database\Seeders;

use App\Models\Charla;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class AsisteSeeder extends Seeder
{
    public function run(): void
    {
        $charlaIA = Charla::where('nombre', 'Inteligencia Artificial y futuro')->firstOrFail();
        $charlaWeb = Charla::where('nombre', 'Desarrollo Web Moderno')->firstOrFail();
        $charlaEmprendimiento = Charla::where('nombre', 'Emprendimiento Tecnológico')->firstOrFail();

        $ana = Usuario::where('email', 'ana@example.com')->firstOrFail();
        $marc = Usuario::where('email', 'marc@example.com')->firstOrFail();
        $lucia = Usuario::where('email', 'lucia@example.com')->firstOrFail();

        // attach() añade parejas (charla, usuario) a la tabla intermedia "asiste"
        // (Se pueden pasar varios ids en un array)
        $charlaIA->asistentes()->attach([$ana->id, $marc->id, $lucia->id]);
        $charlaWeb->asistentes()->attach([$ana->id, $lucia->id]);
        $charlaEmprendimiento->asistentes()->attach([$marc->id]);
    }
}
