<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('acceso', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha_hora');
            $table->foreignId('id_usuario')->unique()->constrained('usuario')->cascadeOnDelete();
            // cascade borra acceso si se borra el usuario       
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('acceso');
    }
};
