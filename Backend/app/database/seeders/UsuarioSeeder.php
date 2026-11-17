<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    // forceCreate se salta $fillable; lo usamos porque "rol" NO está en $fillable
    // (así nadie puede hacerse admin desde la API), pero aquí sí queremos fijarlo
    // La contraseña se guarda cifrada sola (cast 'hashed' del modelo)
    public function run(): void
    {
        // Admin y gestores
        Usuario::forceCreate([
            'nombre' => 'Admin',
            'apellido' => 'Sabitech',
            'password' => 'password123',
            'ciudad' => 'Valencia',
            'email' => 'admin@example.com',
            'telefono' => '600000000',
            'rol' => 'admin',
        ]);

        Usuario::forceCreate([
            'nombre' => 'Irene',
            'apellido' => 'Aguilar',
            'password' => 'password123',
            'ciudad' => 'Valencia',
            'email' => 'irene@example.com',
            'telefono' => '600000001',
            'rol' => 'gestor',
        ]);

        Usuario::forceCreate([
            'nombre' => 'Pablo',
            'apellido' => 'Ortega',
            'password' => 'password123',
            'ciudad' => 'Burjassot',
            'email' => 'pablo@example.com',
            'telefono' => '600000002',
            'rol' => 'gestor',
        ]);

        // Ponentes (los mismos nombres que aparecen en CharlaSeeder)
        Usuario::forceCreate([
            'nombre' => 'Carlos',
            'apellido' => 'Martínez',
            'password' => 'password123',
            'ciudad' => 'Valencia',
            'email' => 'carlos@example.com',
            'telefono' => '600000011',
            'rol' => 'ponente',
        ]);

        Usuario::forceCreate([
            'nombre' => 'Laura',
            'apellido' => 'García',
            'password' => 'password123',
            'ciudad' => 'Alicante',
            'email' => 'laura@example.com',
            'telefono' => '600000012',
            'rol' => 'ponente',
        ]);

        Usuario::forceCreate([
            'nombre' => 'David',
            'apellido' => 'López',
            'password' => 'password123',
            'ciudad' => 'Castellón',
            'email' => 'david@example.com',
            'telefono' => '600000013',
            'rol' => 'ponente',
        ]);

        // Asistentes
        Usuario::forceCreate([
            'nombre' => 'Ana',
            'apellido' => 'López',
            'password' => 'password123',
            'ciudad' => 'Valencia',
            'email' => 'ana@example.com',
            'telefono' => '600000021',
            'rol' => 'asistente',
        ]);

        Usuario::forceCreate([
            'nombre' => 'Marc',
            'apellido' => 'Soler',
            'password' => 'password123',
            'ciudad' => 'Burjassot',
            'email' => 'marc@example.com',
            'telefono' => null,
            'rol' => 'asistente',
        ]);

        Usuario::forceCreate([
            'nombre' => 'Lucía',
            'apellido' => 'Fernández',
            'password' => 'password123',
            'ciudad' => 'Paterna',
            'email' => 'lucia@example.com',
            'telefono' => '600000023',
            'rol' => 'asistente',
        ]);
    }
}
