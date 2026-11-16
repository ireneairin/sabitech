<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reserva', function (Blueprint $table) {
            $table->id();
            $table->string('estado')->default('activa');
            $table->dateTime('fecha_reserva');
            $table->string('qr')->nullable()->unique();

            $table->foreignId('id_usuario')
                ->constrained('usuario')
                ->cascadeOnDelete();

            $table->foreignId('id_charla')
                ->constrained('charla')
                ->cascadeOnDelete();

            $table->unique(['id_usuario', 'id_charla']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reserva');
    }
};
