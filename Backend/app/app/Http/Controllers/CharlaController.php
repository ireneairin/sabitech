<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use App\Models\Sala;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CharlaController extends Controller
{
    //listar todas las charlas
    public function list(): JsonResponse
    {
        $charlas = Charla::all();
        return response()->json(['data' => $charlas], 200);
    }

    //buscar por id de charla
    public function idCharla(Request $idCharla): JsonResponse
    {
        $charla = Charla::find($id);
        if ($charla) {
            return response()->json(['data' => $charla], 200);
        }
        return response()->json(['mensaje' => 'Charla no encontrada'], 404);
    }

    //crear charla
    public function crearCharla(Request $request){
        // validar que tenemos los campos
        $datos = $request -> validate([
            'titulo' => 'required|string|max:150',
            'descripcion' => 'required|string|max:225',
            'ponente' => 'required|string|max:60',
            'categoria' => 'required|string|max:10',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i',
            'id_sala' => 'required|exists:sala,id'
        ]);

        // validar que existe gestor empleado 
        // para nosotras el gestor es el admin (definido en el rol del usuario)
        /* $gestor = DB::table('empleado')
            ->where('id', $datos['id_gestor'])
            ->exists();
        if(!$gestor){
            return response()->json(['message' => 'Gestor no encontrado'], 404);
        }       */

        // preparar datos para la base de datos
        /*
        $datos['acceso_bloqueado'] = false;
        $datos['estado'] = 'BORRADOR'; 
        */
        
        //inserción de datos
        $id = DB::table('charla')
        ->insertGetId($datos);

        //recuperar charla para validarla

        $charla = DB::table('charla')
            ->where('id', $id)
            ->first(); // busca el primer registro que coincida con el id
    
            if(!$id){
                return response()->json(['mensaje' => 'Charla no encontrada'], 404);
            }
            return response()->json(['mensaje' => 'Charla creada exitosamente'], 201);

    }

    //eliminar charla
    public function eliminarCharla(Request $request, $id): JsonResponse
    {
        // Verificar si la charla existe
        $charla = Charla::find($id);
        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }
  
        $deleted = DB::table('charla')->where('id', $id)->delete();

        return response()->json(['mensaje' => 'Charla eliminada exitosamente'], 200);
    }

    //modificar charla
    public function modificarCharla(Request $request, $id){
        // validar que tenemos los campos
        $datos = $request -> validate([
            'titulo' => 'required|string|max:150',
            'descripcion' => 'required|string|max:225',
            'ponente' => 'required|string|max:60',
            'categoria' => 'required|string|max:10',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i',
            'id_sala' => 'required|exists:sala,id'
        ]);

        $charla = Charla::find($id);
        if (!$charla) {
            return response()->json(['mensaje' => 'Charla no encontrada'], 404);
        }

        $charla->update($datos);

        return response()->json(['data' => $charla->load('sala')], 200);

    }
}
