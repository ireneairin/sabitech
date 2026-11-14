<?php

use App\Http\Controllers\CharlaController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\AsistenciaController;
use Illuminate\Support\Facades\Route;

//CRUD de charlas
Route::get('/charlas', [CharlaController::class, 'list']);
Route::get('/charlas/{id}', [CharlaController::class, 'idCharla']);
Route::post('/charlas', [CharlaController::class, 'crearCharla']);
Route::delete('/charlas/{id}', [CharlaController::class, 'eliminarCharla']);
Route::put('/charlas/{id}', [CharlaController::class, 'modificarCharla']);

Route::get('/salas', [SalaController::class, 'list']);
Route::get('/salas/{id}', [SalaController::class, 'idSala']);