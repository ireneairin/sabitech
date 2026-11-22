<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Tabla intermedia Gestiona (usuarios que gestionan la charla)
class GestionaController extends Controller
{
    // GET /api/charlas/5/gestores
    public function list(int $idCharla): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        return response()->json(['data' => $charla->ponentes], 200);
    }

    // POST /api/charlas/5/gestores   body: { "id_usuario": 3 }
    public function agregar(Request $request, int $idCharla): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $datos = $request->validate([
            'id_usuario' => 'required|exists:usuario,id',
        ]);

        $charla->gestores()->syncWithoutDetaching([$datos['id_usuario']]);

        return response()->json([
            'data' => $charla->gestores()->get(),
            'mensaje' => 'Usuario añadido correctamente',
        ], 201);
    }

    // DELETE /api/charlas/5/gestores/3
    public function quitar(int $idCharla, int $idUsuario): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $charla->gestores()->detach($idUsuario);

        return response()->json(['mensaje' => 'Usuario quitado correctamente'], 200);
    }
}
