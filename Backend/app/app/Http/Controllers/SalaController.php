<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalaController extends Controller
{
    //listar todas las salas
    public function list(): JsonResponse
    {
        $salas = Sala::all();
        return response()->json(['data' => $salas], 200);
    }

    //buscar por id de sala
    public function idSala(Request $idSala): JsonResponse
    {
        $sala = Sala::find($idSala);
        if ($sala) {
            return response()->json(['data' => $sala], 200);
        }
        return response()->json(['mensaje' => 'Sala no encontrada'], 404);
    }

}
