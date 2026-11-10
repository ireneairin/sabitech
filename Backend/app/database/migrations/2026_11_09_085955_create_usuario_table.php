<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->string('apellido', 60);
            $table->string('password');
            $table->string('ciudad', 60);
            $table->string('email')->unique();
            $table->string('telefono', 20)->nullable();
            $table->timestamp('fecha_registro')->useCurrent();
            $table->string('rol')->default('asistente');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuario');
    }
};
