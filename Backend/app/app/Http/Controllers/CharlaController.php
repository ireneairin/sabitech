<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CharlaController extends Controller
{
    // GET /api/charlas
    public function list(): JsonResponse
    {
        $charlas = Charla::with('sala')->get();

        return response()->json(['data' => $charlas], 200);
    }

    // GET /api/charlas/5
    public function idCharla(int $id): JsonResponse
    {
        $charla = Charla::with('sala')->find($id);

        if ($charla) {
            return response()->json(['data' => $charla], 200);
        }

        return response()->json(['mensaje' => 'Charla no encontrada'], 404);
    }

    // POST /api/charlas
    public function crearCharla(Request $request): JsonResponse
    {
        // validate()comprueba los datos; si algo falla Laravel responde 422 y no sigue
        // Si todo va bien, devuelve solo los campos validados
        $datos = $request->validate($this->reglas());

        $charla = Charla::create($datos);

        // load('sala') añade la sala a la respuesta
        return response()->json([
            'data' => $charla->load('sala'),
            'mensaje' => 'Charla creada correctamente',
        ], 201);
    }

    // PUT /api/charlas/5
    public function modificarCharla(Request $request, int $id): JsonResponse
    {
        $charla = Charla::find($id);

        if (!$charla) {
            return response()->json([
                'mensaje' => 'Charla no encontrada',
            ], 404);
        }

        $datos = $request->validate($this->reglas());

        $charla->update($datos);

        return response()->json([
            'data' => $charla->load('sala'),
            'mensaje' => 'Charla actualizada correctamente',
        ], 200);
    }

    // DELETE /api/charlas/5
    public function eliminarCharla(int $id): JsonResponse
    {
        $charla = Charla::find($id);

        if (!$charla) {
            return response()->json([
                'mensaje' => 'Charla no encontrada',
            ], 404);
        }

        // Las filas en asiste, gestiona e imparte se borran solas (onCascadeDelete)
        $charla->delete();

        return response()->json([
            'mensaje' => 'Charla eliminada correctamente',
        ], 200);
    }

    private function reglas(): array
    {
        return [
            'nombre' => 'required|string|max:150',
            'descripcion' => 'required|string',
            'ponente' => 'required|string|max:60',
            'categoria' => 'required|string|max:10',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
            'id_sala' => 'required|exists:sala,id',
        ];
    }
}
