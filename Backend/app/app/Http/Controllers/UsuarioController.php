<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    // GET /api/usuarios
    public function list(): JsonResponse
    {
        $usuarios = Usuario::all();

        return response()->json(['data' => $usuarios], 200);
    }

    // GET /api/usuarios/5
    public function idUsuario(int $id): JsonResponse
    {
        $usuario = Usuario::find($id);
        if ($usuario) {
            return response()->json(['data' => $usuario], 200);
        }
        return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
    }

    // POST /api/usuarios
    public function crearUsuario(Request $request): JsonResponse
    {
        $datos = $request->validate($this->reglas());

        $usuario = Usuario::create($datos);

        // refresh() vuelve a leer la fila para incluir rol y fecha_registro, los pone MySQL por defecto
        return response()->json([
            'data' => $usuario->refresh(),
            'mensaje' => 'Usuario creado correctamente',
        ], 201);
    }

    // PUT /api/usuarios/5
    public function modificarUsuario(Request $request, int $id): JsonResponse
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }

        $datos = $request->validate($this->reglas($id));

        $usuario->update($datos);

        return response()->json([
            'data' => $usuario,
            'mensaje' => 'Usuario actualizado correctamente',
        ], 200);
    }

    // DELETE /api/usuarios/5
    public function eliminarUsuario(int $id): JsonResponse
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['mensaje' => 'Usuario eliminado correctamente'], 200);
    }

    // Si recibe un id es que estamos MODIFICANDO
    private function reglas(?int $id = null): array
    {
        // El email debe ser único salvo para el propio usuario al modificarlo
        $email = Rule::unique('usuario', 'email');
        if ($id) {
            $email->ignore($id);
        }

        return [
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:60',
            'password' => ($id ? 'sometimes' : 'required') . '|string|min:8',
            'ciudad' => 'required|string|max:60',
            'email' => ['required', 'email', 'max:255', $email],
            'telefono' => 'nullable|string|max:20',
        ];
    }
}
