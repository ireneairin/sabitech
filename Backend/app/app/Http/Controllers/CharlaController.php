<?php

namespace App\Http\Controllers;

use App\Models\Charla;
use App\Models\Sala;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CharlaController extends Controller
{
    public function list(): JsonResponse
    {
        $charlas = Charla::with(['ponente', 'sala'])
            ->withCount('reservasConfirmadas')
            ->where('estado', 'publicada')
            ->orderBy('inicio')
            ->get();
            
        return response()->json($charlas, 200);
    }
}