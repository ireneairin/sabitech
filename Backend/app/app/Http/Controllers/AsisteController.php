<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Tabla intermedia Asiste (qué usuarios asisten a qué charla)
class AsisteController extends Controller
{
    // GET /api/charlas/5/asistentes
    public function list(int $idCharla): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            // Sin paréntesis (->asistentes): Laravel ejecuta la consulta y da los usuarios
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        return response()->json(['data' => $charla->asistentes], 200);
    }

    // POST /api/charlas/5/asistentes   body: { "id_usuario": 3 }
    public function agregar(Request $request, int $idCharla): JsonResponse
    {
        $charla = Charla::with('sala')->find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $datos = $request->validate([
            'id_usuario' => 'required|exists:usuario,id',
        ]);

        // Regla: no apuntar a más gente que el aforo de la sala
        // (Si el usuario ya estaba apuntado no hace falta comprobarlo)
        $yaApuntado = $charla->asistentes->contains($datos['id_usuario']);

        if (!$yaApuntado && $charla->asistentes->count() >= $charla->sala->aforo) {
            return response()->json(['mensaje' => 'Aforo completo'], 409);
        }

        // syncWithoutDetaching = "añade si no estaba ya, y no toques al resto"
        // (attach() daría error si el usuario ya estuviera apuntado)
        $charla->asistentes()->syncWithoutDetaching([$datos['id_usuario']]);

        // Con paréntesis (->asistentes()): la relación como constructor de consultas
        return response()->json([
            'data' => $charla->asistentes()->get(),
            'mensaje' => 'Asistencia registrada correctamente',
        ], 201);
    }

    // DELETE /api/charlas/5/asistentes/3
    public function quitar(int $idCharla, int $idUsuario): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        // detach() quita la pareja (charla, usuario) de la tabla intermedia
        $charla->asistentes()->detach($idUsuario);

        return response()->json(['mensaje' => 'Asistencia cancelada correctamente'], 200);
    }
}
