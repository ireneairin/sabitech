<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // El orden importa: una tabla con clave foránea va DESPUÉS de la tabla a la que apunta
        $this->call([
            // No dependen de nadie
            SalaSeeder::class,
            UsuarioSeeder::class,
            // Dependen de sala y/o usuario
            CharlaSeeder::class,
            AccesoSeeder::class,
            ConsultaSeeder::class,
            ReservaSeeder::class,
            // Tablas intermedias (dependen de charla y usuario)
            AsisteSeeder::class,
            GestionaSeeder::class,
            ImparteSeeder::class,
        ]);
    }
}
