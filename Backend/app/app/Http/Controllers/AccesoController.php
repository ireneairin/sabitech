<?php

namespace App\Http\Controllers;

use App\Models\Acceso;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// acceso.id_usuario es UNIQUE: solo hay UNA fila por usuario (la fecha de su último acceso)
class AccesoController extends Controller
{
    // GET /api/accesos
    public function list(): JsonResponse
    {
        $accesos = Acceso::with('usuario')->orderByDesc('fecha_hora')->get();

        return response()->json(['data' => $accesos], 200);
    }

    // GET /api/accesos/5
    public function idAcceso(int $id): JsonResponse
    {
        $acceso = Acceso::with('usuario')->find($id);

        if ($acceso) {
            return response()->json(['data' => $acceso], 200);
        }

        return response()->json(['mensaje' => 'Acceso no encontrado'], 404);
    }

    // POST /api/accesos   body: { "id_usuario": 3 }
    // Cuando exista el login, esta misma lógica se ejecutará dentro de él
    public function registrarAcceso(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'id_usuario' => 'required|exists:usuario,id',
        ]);

        // "Si ya hay un acceso de este usuario, actualiza la fecha; si no, créalo."
        $acceso = Acceso::updateOrCreate(
            ['id_usuario' => $datos['id_usuario']],   // cómo buscar la fila
            ['fecha_hora' => now()]                   // qué valores guardar
        );

        // wasRecentlyCreated es true si la fila se acaba de crear
        $codigo = $acceso->wasRecentlyCreated ? 201 : 200;

        return response()->json([
            'data' => $acceso,
            'mensaje' => 'Acceso registrado correctamente',
        ], $codigo);
    }
}
