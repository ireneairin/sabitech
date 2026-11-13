<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('charla', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 150);
            $table->text('descripcion',255);
            $table->string('ponente', 60);
            $table->string('categoria', 10);
            $table->date('fecha');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            //crea la clave foranea
            $table->foreignId('id_sala')->constrained('sala'); //indica que apunta al id de sala
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('charla');
    }
};
