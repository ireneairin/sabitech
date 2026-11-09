<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{ function up(): void
    {
        Schema::create('consulta', function (Blueprint $table) {
            $table->id();
            $table->string('asunto', 200);
            $table->string('email', 100);
            $table->text('mensaje');
            $table->string('estado')->default('pendiente');
            $table->foreignId('id_usuario')->constrained('usuario')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consulta');
    }
};
