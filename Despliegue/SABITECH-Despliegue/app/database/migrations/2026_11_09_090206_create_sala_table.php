<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sala', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->unsignedInteger('aforo'); //número entero sin signo, para que no haya número negativo de aforo
            $table->string('ubicacion', 100);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sala');
    }
};
