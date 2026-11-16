<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservaController extends Controller
{
    // Estados en los que puede estar la reserva
    private const ESTADOS = ['activa', 'cancelada'];

    // GET /api/reservas
    public function list(): JsonResponse
    {
        $reservas = Reserva::with('usuario')->orderByDesc('fecha_reserva')->get();

        return response()->json(['data' => $reservas], 200);
    }

    // GET /api/reservas/5
    public function idReserva(int $id): JsonResponse
    {
        $reserva = Reserva::with('usuario')->find($id);

        if ($reserva) {
            return response()->json(['data' => $reserva], 200);
        }

        return response()->json(['mensaje' => 'Reserva no encontrada'], 404);
    }

    // POST /api/reservas
    public function crearReserva(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'fecha_reserva' => 'required|date',
            'id_usuario' => 'required|exists:usuario,id',
        ]);

        // El QR lo genera el servidor
        // Str::uuid() crea un identificador único; la columna qr es unique
        $datos['qr'] = (string) Str::uuid();

        $reserva = Reserva::create($datos);

        // refresh() para que aparezca estado = 'activa' (lo pone MySQL)
        return response()->json([
            'data' => $reserva->refresh(),
            'mensaje' => 'Reserva creada correctamente',
        ], 201);
    }

    // PUT /api/reservas/5   (por ejemplo, para cancelarla)
    public function modificarReserva(Request $request, int $id): JsonResponse
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json(['mensaje' => 'Reserva no encontrada'], 404);
        }

        $datos = $request->validate([
            'estado' => 'required|in:' . implode(',', self::ESTADOS),
        ]);

        $reserva->update($datos);

        return response()->json([
            'data' => $reserva,
            'mensaje' => 'Reserva actualizada correctamente',
        ], 200);
    }

    // DELETE /api/reservas/5
    public function eliminarReserva(int $id): JsonResponse
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json(['mensaje' => 'Reserva no encontrada'], 404);
        }

        $reserva->delete();

        return response()->json(['mensaje' => 'Reserva eliminada correctamente'], 200);
    }
}
