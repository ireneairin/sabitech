<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // POST /api/login
    public function login(Request $request): JsonResponse
    {
        $datos = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $usuario = Usuario::where('email', $datos['email'])->first();

        if (!$usuario || !Hash::check($datos['password'], $usuario->password)) {
            return response()->json([
                'mensaje' => 'Email o contraseña incorrectos'
            ], 401);
        }

        // Generar un token aleatorio nativo y guardarlo en la columna api_token
        $token = Str::random(60);
        $usuario->api_token = hash('sha256', $token);
        $usuario->save();

        return response()->json([
            'token'   => $token,
            'data'    => $usuario,
            'mensaje' => 'Sesión iniciada correctamente',
        ], 200);

        // Autenticar mediante sesión nativa de Laravel
        /*Auth::login($usuario);
        $request->session()->regenerate();

        return response()->json([
            'data'    => $usuario,
            'mensaje' => 'Sesión iniciada correctamente',
        ], 200);*/
    }

    // POST /api/logout
    public function logout(Request $request): JsonResponse
    {
        $usuario = $request->user();
        $usuario->api_token = null;
        $usuario->save();
        //$request->user()->currentAccessToken()->delete();
        /*Auth::guard('web')->logout();*/
        /*Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        */
        return response()->json([
            'mensaje' => 'Sesión cerrada correctamente'
        ], 200);
    }
}
