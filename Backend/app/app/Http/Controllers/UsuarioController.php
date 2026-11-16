<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    //listar todas las salas
    public function list(): JsonResponse
    {
        $usuarios = Usuario::all();
        return response()->json(['data' => $usuario], 200);
    }

    //buscar por id de sala
    public function idUsuario(Request $idUsuario): JsonResponse
    {
        $usuario = Usuario::find($idUsuario);
        if ($usuario) {
            return response()->json(['data' => $usuario], 200);
        }
        return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
    }

}