<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalaController extends Controller
{
    // GET /api/salas
    public function list(): JsonResponse
    {
        $salas = Sala::all();
        return response()->json(['data' => $salas], 200);
    }

    // GET /api/salas/5
    public function idSala(int $id): JsonResponse
    {
        $sala = Sala::find($id);

        if ($sala) {
            return response()->json(['data' => $sala], 200);
        }
        return response()->json(['mensaje' => 'Sala no encontrada'], 404);
    }

    // POST /api/salas
    public function crearSala(Request $request): JsonResponse
    {
        $datos = $request->validate($this->reglas());

        $sala = Sala::create($datos);

        return response()->json([
            'data' => $sala,
            'mensaje' => 'Sala creada correctamente',
        ], 201);
    }

    // PUT /api/salas/5
    public function modificarSala(Request $request, int $id): JsonResponse
    {
        $sala = Sala::find($id);

        if (!$sala) {
            return response()->json(['mensaje' => 'Sala no encontrada'], 404);
        }

        $datos = $request->validate($this->reglas());

        $sala->update($datos);

        return response()->json([
            'data' => $sala,
            'mensaje' => 'Sala actualizada correctamente',
        ], 200);
    }

    // DELETE /api/salas/5
    public function eliminarSala(int $id): JsonResponse
    {
        $sala = Sala::find($id);

        if (!$sala) {
            return response()->json(['mensaje' => 'Sala no encontrada'], 404);
        }

        // charla.id_sala apunta a esta tabla SIN cascade: si la sala tiene charlas,
        // MySQL no deja borrarla y daría un error 500 
        if ($sala->charlas()->exists()) {
            return response()->json([
                'mensaje' => 'No se puede eliminar: la sala tiene charlas asignadas',
            ], 409);
        }

        $sala->delete();

        return response()->json(['mensaje' => 'Sala eliminada correctamente'], 200);
    }

    private function reglas(): array
    {
        return [
            'nombre' => 'required|string|max:50',
            'aforo' => 'required|integer|min:1',
            'ubicacion' => 'required|string|max:100',
        ];
    }
}
