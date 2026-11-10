<?php

use Illuminate\Support\Facades\Route;

Route::get('/charlas', [\App\Http\Controllers\CharlaController::class, 'list']);

