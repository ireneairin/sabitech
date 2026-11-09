<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('imparte', function (Blueprint $table) {
            $table->foreignId('id_usuario')->constrained('usuario')->cascadeOnDelete();
            $table->foreignId('id_charla')->constrained('charla')->cascadeOnDelete();
            $table->primary(['id_usuario', 'id_charla']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imparte');
    }
};
