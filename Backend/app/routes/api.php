<?php

use App\Http\Controllers\AccesoController;
use App\Http\Controllers\AsisteController;
use App\Http\Controllers\CharlaController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\GestionaController;
use App\Http\Controllers\ImparteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Formato:  Route::MÉTODO('/url', [Controlador::class, 'método']);
// ->whereNumber('id') exige que {id} sea un número (si no, Laravel responde 404).

// ---------------- SALAS ----------------
Route::get('/salas', [SalaController::class, 'list']);
Route::get('/salas/{id}', [SalaController::class, 'idSala'])->whereNumber('id');
Route::post('/salas', [SalaController::class, 'crearSala']);
Route::put('/salas/{id}', [SalaController::class, 'modificarSala'])->whereNumber('id');
Route::delete('/salas/{id}', [SalaController::class, 'eliminarSala'])->whereNumber('id');

// ---------------- USUARIOS ----------------
Route::get('/usuarios', [UsuarioController::class, 'list']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'idUsuario'])->whereNumber('id');
Route::post('/usuarios', [UsuarioController::class, 'crearUsuario']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'modificarUsuario'])->whereNumber('id');
Route::delete('/usuarios/{id}', [UsuarioController::class, 'eliminarUsuario'])->whereNumber('id');

// ---------------- CHARLAS ----------------
Route::get('/charlas', [CharlaController::class, 'list']);
Route::get('/charlas/{id}', [CharlaController::class, 'idCharla'])->whereNumber('id');
Route::post('/charlas', [CharlaController::class, 'crearCharla']);
Route::put('/charlas/{id}', [CharlaController::class, 'modificarCharla'])->whereNumber('id');
Route::delete('/charlas/{id}', [CharlaController::class, 'eliminarCharla'])->whereNumber('id');

// ---------------- ACCESOS ----------------
Route::get('/accesos', [AccesoController::class, 'list']);
Route::get('/accesos/{id}', [AccesoController::class, 'idAcceso'])->whereNumber('id');
Route::post('/accesos', [AccesoController::class, 'registrarAcceso']);

// ---------------- CONSULTAS ----------------
Route::get('/consultas', [ConsultaController::class, 'list']);
Route::get('/consultas/{id}', [ConsultaController::class, 'idConsulta'])->whereNumber('id');
Route::post('/consultas', [ConsultaController::class, 'crearConsulta']);
Route::put('/consultas/{id}', [ConsultaController::class, 'modificarConsulta'])->whereNumber('id');
Route::delete('/consultas/{id}', [ConsultaController::class, 'eliminarConsulta'])->whereNumber('id');

// ---------------- TABLAS INTERMEDIAS (charla <-> usuario) ----------------
// Los parámetros se pasan al método por ORDEN: {idCharla} primero, {idUsuario} después

// asiste: usuarios que asisten a la charla
Route::get('/charlas/{idCharla}/asistentes', [AsisteController::class, 'list'])
    ->whereNumber('idCharla');
Route::post('/charlas/{idCharla}/asistentes', [AsisteController::class, 'agregar'])
    ->whereNumber('idCharla');
Route::delete('/charlas/{idCharla}/asistentes/{idUsuario}', [AsisteController::class, 'quitar'])
    ->whereNumber(['idCharla', 'idUsuario']);

// gestiona: usuarios que gestionan la charla
Route::get('/charlas/{idCharla}/gestores', [GestionaController::class, 'list'])
    ->whereNumber('idCharla');
Route::post('/charlas/{idCharla}/gestores', [GestionaController::class, 'agregar'])
    ->whereNumber('idCharla');
Route::delete('/charlas/{idCharla}/gestores/{idUsuario}', [GestionaController::class, 'quitar'])
    ->whereNumber(['idCharla', 'idUsuario']);

// imparte: usuarios que imparten la charla
Route::get('/charlas/{idCharla}/ponentes', [ImparteController::class, 'list'])
    ->whereNumber('idCharla');
Route::post('/charlas/{idCharla}/ponentes', [ImparteController::class, 'agregar'])
    ->whereNumber('idCharla');
Route::delete('/charlas/{idCharla}/ponentes/{idUsuario}', [ImparteController::class, 'quitar'])
    ->whereNumber(['idCharla', 'idUsuario']);

// ---------------- AUTENTICACIÓN ----------------
Route::post('/login', [AuthController::class, 'login']);

// ---------------- RESERVAS Y SESIÓN (Protegidas con Token) ----------------
Route::middleware('auth:api')->group(function () { /*auth:api*/
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/mis-reservas', [ReservaController::class, 'misReservas']);
    Route::get('/reservas', [ReservaController::class, 'list']);
    Route::get('/reservas/{id}', [ReservaController::class, 'idReserva'])->whereNumber('id');
    Route::post('/reservas', [ReservaController::class, 'crearReserva']);
    Route::put('/reservas/{id}', [ReservaController::class, 'modificarReserva'])->whereNumber('id');
    Route::delete('/reservas/{id}', [ReservaController::class, 'eliminarReserva'])->whereNumber('id');
});
