<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConsultaController extends Controller
{
    // Estados en los que puede estar la consulta
    private const ESTADOS = ['pendiente', 'resuelta'];

    // GET /api/consultas
    public function list(): JsonResponse
    {
        $consultas = Consulta::with('usuario')->orderByDesc('id')->get();

        return response()->json(['data' => $consultas], 200);
    }

    // GET /api/consultas/5
    public function idConsulta(int $id): JsonResponse
    {
        $consulta = Consulta::with('usuario')->find($id);

        if ($consulta) {
            return response()->json(['data' => $consulta], 200);
        }

        return response()->json(['mensaje' => 'Consulta no encontrada'], 404);
    }

    // POST /api/consultas - formulario de contacto
    public function crearConsulta(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'asunto' => 'required|string|max:200',
            'email' => 'required|email|max:100',
            'mensaje' => 'required|string',
            'id_usuario' => 'required|exists:usuario,id',
        ]);

        $consulta = Consulta::create($datos);

        // refresh() para que aparezca estado = 'pendiente' (lo pone MySQL)
        return response()->json([
            'data' => $consulta->refresh(),
            'mensaje' => 'Consulta enviada correctamente',
        ], 201);
    }

    // PUT /api/consultas/5   (un gestor cambia el estado; el resto no se modifica)
    public function modificarConsulta(Request $request, int $id): JsonResponse
    {
        $consulta = Consulta::find($id);

        if (!$consulta) {
            return response()->json(['mensaje' => 'Consulta no encontrada'], 404);
        }

        $datos = $request->validate([
            'estado' => 'required|in:' . implode(',', self::ESTADOS),
        ]);

        $consulta->update($datos);

        return response()->json([
            'data' => $consulta,
            'mensaje' => 'Consulta actualizada correctamente',
        ], 200);
    }

    // DELETE /api/consultas/5
    public function eliminarConsulta(int $id): JsonResponse
    {
        $consulta = Consulta::find($id);

        if (!$consulta) {
            return response()->json(['mensaje' => 'Consulta no encontrada'], 404);
        }

        $consulta->delete();

        return response()->json(['mensaje' => 'Consulta eliminada correctamente'], 200);
    }
}
