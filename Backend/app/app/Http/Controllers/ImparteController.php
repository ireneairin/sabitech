<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Tabla intermedia Imparte (usuarios que imparten la charla)
class ImparteController extends Controller
{
    // GET /api/charlas/5/ponentes
    public function list(int $idCharla): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        return response()->json(['data' => $charla->ponentes], 200);
    }

    // POST /api/charlas/5/ponentes   body: { "id_usuario": 3 }
    public function agregar(Request $request, int $idCharla): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $datos = $request->validate([
            'id_usuario' => 'required|exists:usuario,id', // required: campo id_usuario tiene que venir en el cuerpo de la petición ;; exists:usuario,id (formato exists:tabla,columna - usuario es el nombre de la tabla, no del modelo): 'tiene que existir una fila en la tabla usuario cuya columna id valga eso'
        ]);

        $charla->ponentes()->syncWithoutDetaching([$datos['id_usuario']]);

        return response()->json([
            'data' => $charla->ponentes()->get(),
            'mensaje' => 'Usuario añadido correctamente',
        ], 201);
    }

    // DELETE /api/charlas/5/ponentes/3
    public function quitar(int $idCharla, int $idUsuario): JsonResponse
    {
        $charla = Charla::find($idCharla);

        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $charla->ponentes()->detach($idUsuario);

        return response()->json(['mensaje' => 'Usuario quitado correctamente'], 200);
    }
}
