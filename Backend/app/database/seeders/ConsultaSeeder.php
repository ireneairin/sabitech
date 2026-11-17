<?php

namespace Database\Seeders;

use App\Models\Consulta;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class ConsultaSeeder extends Seeder
{
    // Estados de ejemplo: 'pendiente' y 'resuelta' (los mismos que ConsultaController)
    public function run(): void
    {
        Consulta::create([
            'asunto' => 'Duda sobre el horario de las charlas',
            'email' => 'ana@example.com',
            'mensaje' => 'Hola, ¿se pueden consultar los horarios completos antes del evento?',
            'estado' => 'pendiente',
            'id_usuario' => Usuario::where('email', 'ana@example.com')->firstOrFail()->id,
        ]);

        Consulta::create([
            'asunto' => 'No puedo acceder a mi cuenta',
            'email' => 'marc@example.com',
            'mensaje' => 'Al iniciar sesión me aparece un error. ¿Podéis revisarlo?',
            'estado' => 'resuelta',
            'id_usuario' => Usuario::where('email', 'marc@example.com')->firstOrFail()->id,
        ]);

        Consulta::create([
            'asunto' => 'Certificado de asistencia',
            'email' => 'lucia@example.com',
            'mensaje' => '¿Se entregará certificado a quienes asistan a las charlas?',
            'estado' => 'pendiente',
            'id_usuario' => Usuario::where('email', 'lucia@example.com')->firstOrFail()->id,
        ]);

        Consulta::create([
            'asunto' => 'Cambio de correo electrónico',
            'email' => 'ana@example.com',
            'mensaje' => 'Quiero actualizar el correo con el que me registré.',
            'estado' => 'resuelta',
            'id_usuario' => Usuario::where('email', 'ana@example.com')->firstOrFail()->id,
        ]);
    }
}
