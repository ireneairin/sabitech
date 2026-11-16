<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::create([
            'nombre' => 'Ana',
            'apellido' => 'López',
            'password' => 'password123',
            'ciudad' => 'Valencia',
            'email' => 'ana@example.com',
            'telefono' => '600000001',
        ]);

        Usuario::create([
            'nombre' => 'Marc',
            'apellido' => 'Soler',
            'password' => 'password123',
            'ciudad' => 'Burjassot',
            'email' => 'marc@example.com',
            'telefono' => null,
        ]);
    }
}
