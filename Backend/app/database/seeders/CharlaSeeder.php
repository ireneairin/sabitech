<?php

namespace Database\Seeders;

use App\Models\Charla;
use App\Models\Sala;
use Illuminate\Database\Seeder;

class CharlaSeeder extends Seeder
{
    public function run(): void
    {
        Charla::create([
            'nombre' => 'Inteligencia Artificial y futuro',
            'descripcion' => 'Charla sobre la inteligencia artificial y sus aplicaciones en el mundo actual.',
            'ponente' => 'Carlos Martínez',
            'categoria' => 'Tech',
            'fecha' => '2027-06-13',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Sala Ada Lovelace')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Telemedicina y Diagnóstico Remoto',
            'descripcion' => 'Cómo las nuevas herramientas digitales están transformando la atención primaria y el seguimiento de pacientes.',
            'ponente' => 'Dra. Elena Navarro',
            'categoria' => 'Salud',
            'fecha' => '2027-06-13',
            'hora_inicio' => '11:30',
            'hora_fin' => '12:30',
            'id_sala' => Sala::where('nombre', 'Auditorio Salud & Bio')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Desarrollo Web Moderno',
            'descripcion' => 'Introducción a las tecnologías actuales del desarrollo de aplicaciones web.',
            'ponente' => 'Laura García',
            'categoria' => 'Tech',
            'fecha' => '2027-06-13',
            'hora_inicio' => '12:00',
            'hora_fin' => '13:00',
            'id_sala' => Sala::where('nombre', 'Sala de Innovación')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Liderazgo Ágil en Equipos Híbridos',
            'descripcion' => 'Estrategias prácticas para gestionar equipos multidisciplinares y mantener la productividad.',
            'ponente' => 'Javier Morales',
            'categoria' => 'Business',
            'fecha' => '2027-06-13',
            'hora_inicio' => '16:30',
            'hora_fin' => '17:30',
            'id_sala' => Sala::where('nombre', 'Lab Business 501')->firstOrFail()->id,
        ]);

        // ================= DÍA 2: 14 DE JUNIO DE 2027 =================
        Charla::create([
            'nombre' => 'Emprendimiento Tecnológico',
            'descripcion' => 'Cómo desarrollar una idea de negocio relacionada con la tecnología.',
            'ponente' => 'David López',
            'categoria' => 'Business',
            'fecha' => '2027-06-14',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Sala Business')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Nutrición y Rendimiento Cognitivo',
            'descripcion' => 'Claves científicas sobre cómo la alimentación impacta en la concentración y la salud mental en el trabajo.',
            'ponente' => 'Dr. Pablo Serrano',
            'categoria' => 'Salud',
            'fecha' => '2027-06-14',
            'hora_inicio' => '11:30',
            'hora_fin' => '12:30',
            'id_sala' => Sala::where('nombre', 'Sala Principal')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Ciberseguridad para Empresas',
            'descripcion' => 'Principales amenazas actuales y protocolos esenciales para proteger la infraestructura corporativa.',
            'ponente' => 'Marta Ruiz',
            'categoria' => 'Tech',
            'fecha' => '2027-06-14',
            'hora_inicio' => '16:00',
            'hora_fin' => '17:00',
            'id_sala' => Sala::where('nombre', 'Aula Tech 302')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Financiación y Rondas de Inversión',
            'descripcion' => 'Qué buscan los inversores de capital riesgo y cómo preparar un pitch deck sólido para startups.',
            'ponente' => 'Alejandro Torres',
            'categoria' => 'Business',
            'fecha' => '2027-06-14',
            'hora_inicio' => '17:30',
            'hora_fin' => '18:30',
            'id_sala' => Sala::where('nombre', 'Lab Business 501')->firstOrFail()->id,
        ]);

        // ================= DÍA 3: 15 DE JUNIO DE 2027 =================
        Charla::create([
            'nombre' => 'Biotecnología e Impresión 3D de Tejidos',
            'descripcion' => 'Avances recientes en medicina regenerativa y fabricación aditiva aplicada a prótesis personalizadas.',
            'ponente' => 'Dra. Sofía Belenguer',
            'categoria' => 'Salud',
            'fecha' => '2027-06-15',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Auditorio Salud & Bio')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Arquitecturas Cloud y Contenedores',
            'descripcion' => 'Despliegue continuo y optimización de recursos en la nube utilizando Docker y orquestadores modernos.',
            'ponente' => 'Rubén Ortega',
            'categoria' => 'Tech',
            'fecha' => '2027-06-15',
            'hora_inicio' => '11:30',
            'hora_fin' => '12:30',
            'id_sala' => Sala::where('nombre', 'Aula Tech 302')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Marketing Digital y Analítica de Datos',
            'descripcion' => 'Cómo tomar decisiones comerciales basadas en métricas reales y comportamiento del usuario.',
            'ponente' => 'Beatriz Soler',
            'categoria' => 'Business',
            'fecha' => '2027-06-15',
            'hora_inicio' => '16:30',
            'hora_fin' => '17:30',
            'id_sala' => Sala::where('nombre', 'Sala Business')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Salud Mental y Prevención del Burnout',
            'descripcion' => 'Herramientas psicológicas para detectar el agotamiento profesional y fomentar el bienestar emocional.',
            'ponente' => 'Dra. Lucía Méndez',
            'categoria' => 'Salud',
            'fecha' => '2027-06-15',
            'hora_inicio' => '17:30',
            'hora_fin' => '18:30',
            'id_sala' => Sala::where('nombre', 'Sala Ada Lovelace')->firstOrFail()->id,
        ]);

        // ================= DÍA 4: 16 DE JUNIO DE 2027 =================
        Charla::create([
            'nombre' => 'Big Data Aplicado a la Investigación Clínica',
            'descripcion' => 'El papel del análisis masivo de datos en el descubrimiento de nuevos fármacos y ensayos clínicos.',
            'ponente' => 'Dr. Fernando Gil',
            'categoria' => 'Salud',
            'fecha' => '2027-06-16',
            'hora_inicio' => '10:00',
            'hora_fin' => '11:00',
            'id_sala' => Sala::where('nombre', 'Auditorio Salud & Bio')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Internet de las Cosas (IoT) y Ciudades Inteligentes',
            'descripcion' => 'Sensores conectados, eficiencia energética y movilidad sostenible en los entornos urbanos del mañana.',
            'ponente' => 'Sergio Castaño',
            'categoria' => 'Tech',
            'fecha' => '2027-06-16',
            'hora_inicio' => '11:30',
            'hora_fin' => '12:30',
            'id_sala' => Sala::where('nombre', 'Sala de Innovación')->firstOrFail()->id,
        ]);

        Charla::create([
            'nombre' => 'Escalabilidad y Expansión Internacional',
            'descripcion' => 'Claves legales, operativas y culturales para llevar una empresa tecnológica a mercados europeos.',
            'ponente' => 'Patricia Giménez',
            'categoria' => 'Business',
            'fecha' => '2027-06-16',
            'hora_inicio' => '12:30',
            'hora_fin' => '13:30',
            'id_sala' => Sala::where('nombre', 'Sala Principal')->firstOrFail()->id,
        ]);
    }
}
