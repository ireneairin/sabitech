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
            'id_charla' => 'required|exists:charla,id',
        ]);

        $idUsuario = $request->user()->id;

        // Evitar que el usuario reserve dos veces la misma charla si ya la tiene activa
        $yaReservada = Reserva::where('id_usuario', $idUsuario)
            ->where('id_charla', $datos['id_charla'])
            ->where('estado', 'activa')
            ->exists();

        if ($yaReservada) {
            return response()->json(['mensaje' => 'Ya tienes una reserva activa para esta charla'], 409);
        }

        // El QR lo genera el servidor (el cliente podría falsificarlo)
        // Str::uuid() crea un identificador único; la columna qr es unique
        $reserva = Reserva::create([
            'id_usuario'    => $idUsuario,
            'id_charla'     => $datos['id_charla'],
            'fecha_reserva' => now(),
            'qr'            => (string) Str::uuid(),
        ]);
        /*$datos['qr'] = (string) Str::uuid();

        $reserva = Reserva::create($datos);*/

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

    public function misReservas(Request $request): JsonResponse
    {
        $reservas = Reserva::with('charla')
            ->where('id_usuario', $request->user()->id)
            ->orderByDesc('fecha_reserva')
            ->get();

        return response()->json(['data' => $reservas], 200);
    }
}
