# SABITECH WEB — Gestión de Jornadas Tecnológicas

Aplicación web _responsive_ desarrollada para la gestión integral de conferencias, reservas de plazas y control de acceso mediante códigos QR para las jornadas **SABITECH** (celebradas en las instalaciones de XTART Valencia).

- **Repositorio oficial:** `https://github.com/ireneairin/sabitech.git`
- **Empresa desarrolladora (simulada):** WebTech, S.L.
- **Equipo de desarrollo (2.º DAW - Curso 2026/2027):** Irene Arastey Casañ, Alma Colomar Giménez e Ignacio Piedrabuena Martínez.
- **Hito de referencia:** Primer Checkpoint (Noviembre 2026) — Arquitectura base, catálogo conectado a BBDD, autenticación, reservas persistentes, cancelación y despliegue contenedorizado.

---

## 📋 Tabla de Contenidos

1. [Arquitectura y Stack Tecnológico](#-arquitectura-y-stack-tecnológico)
2. [Requisitos Previos y Dependencias](#-requisitos-previos-y-dependencias)
3. [Despliegue y Arranque de Servicios (Docker)](#-despliegue-y-arranque-de-servicios-docker)
4. [Variables de Entorno](#-variables-de-entorno)
5. [Esquema de Base de Datos](#-esquema-de-base-de-datos)
6. [Documentación de la API (Servidor)](#-documentación-de-la-api-servidor)
7. [Verificación del Despliegue y Pruebas](#-verificación-del-despliegue-y-pruebas)
8. [Estado del Proyecto (Alcance Primer Checkpoint)](#-estado-del-proyecto-alcance-primer-checkpoint)

---

## 🏗 Arquitectura y Stack Tecnológico

El sistema implementa una **arquitectura desacoplada en tres capas** orquestada mediante contenedores Docker:

1. **Capa de Presentación (Frontend):** Desarrollada con **React** y **Vite** (Node.js). Consume la API mediante peticiones HTTP/JSON asíncronas, gestionando vistas, estados de carga/error y diseño _responsive_ adaptado a escritorio y móvil.
2. **Capa de Lógica de Negocio (Backend):** API RESTful construida en **PHP** sobre el framework **Laravel** y servida con **Apache**. Gestiona la autenticación por tokens (`Bearer`), el control de permisos por rol, la integridad de aforos y la generación/validación de tokens QR.
3. **Capa de Persistencia (Base de Datos):** Sistema gestor relacional **MySQL** con almacenamiento persistente mediante volúmenes Docker.

### Resumen de Servicios y Puertos

| Servicio          | Tecnología             | Puerto Expuesto | Descripción                                                |
| :---------------- | :--------------------- | :-------------: | :--------------------------------------------------------- |
| **Frontend**      | Node.js + Vite + React |     `5173`      | Interfaz web de usuario (_SPA/Multipágina_).               |
| **Backend**       | Apache + PHP + Laravel |     `8080`      | Servidor web y API REST en formato JSON.                   |
| **Base de Datos** | MySQL                  |     `3306`      | Motor de base de datos relacional con volumen persistente. |

---

## 💻 Requisitos Previos y Dependencias

Para levantar el entorno de forma reproducible sin instalar PHP, Composer, Node o MySQL directamente en la máquina anfitriona, únicamente se requiere:

- **Git** (para clonar el repositorio).
- **Docker** y **Docker Compose** instalados y en ejecución.
- Puertos `5173`, `8080` y `3306` libres en el equipo local.

_(Nota: Las dependencias internas de PHP se gestionan mediante Composer dentro del contenedor backend, y las dependencias de React mediante `npm` dentro del contenedor frontend)._

---

## 🚀 Despliegue y Arranque de Servicios (Docker)

Sigue estos pasos para levantar los tres servicios desde el repositorio:

### 1. Clonar el repositorio

```bash
git clone https://github.com/ireneairin/sabitech.git
cd sabitech
```

### 2. Configurar las variables de entorno

Copia los archivos de ejemplo de configuración en el backend (y en el frontend si aplica según la estructura de directorios) sin exponer credenciales reales en el repositorio:

```bash
cp backend/.env.example backend/.env
```

_(Asegúrate de que las credenciales de base de datos coincidan con las definidas en el archivo `docker-compose.yml`)._

### 3. Construir y levantar los contenedores

Ejecuta Docker Compose desde la raíz del proyecto para construir las imágenes y arrancar los tres servicios en segundo plano:

```bash
docker compose up -d --build
```

### 4. Inicializar el Backend y la Base de Datos

Una vez levantados los contenedores, instala dependencias (si no se ejecutan durante el _build_), genera la clave de aplicación de Laravel y ejecuta las **migraciones** junto con los **seeders** jerárquicos para poblar el catálogo inicial y usuarios de laboratorio:

```bash
# Instalar dependencias PHP (si es necesario)
docker compose exec backend composer install

# Generar clave de cifrado de Laravel
docker compose exec backend php artisan key:generate

# Ejecutar migraciones y cargar datos ficticios de prueba
docker compose exec backend php artisan migrate:fresh --seed
```

---

## 🔐 Variables de Entorno

El archivo `.env` del servidor Laravel conecta el backend con el contenedor de MySQL utilizando el nombre del servicio definido en Docker Compose:

```env
APP_NAME="Sabitech Web"
APP_ENV=local
APP_KEY=base64:GENERADA_POR_ARTISAN
APP_DEBUG=true
APP_URL=http://localhost:8080

# Conexión a Base de Datos (Servicio Docker)
DB_CONNECTION=mysql
DB_HOST=db              # Nombre del servicio MySQL en docker-compose.yml
DB_PORT=3306
DB_DATABASE=sabitech
DB_USERNAME=sabitech_user
DB_PASSWORD=secret_password
```

En el **Frontend (React)**, la URL base de la API apunta al servicio backend:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🗄 Esquema de Base de Datos

La base de datos relacional en MySQL normaliza la gestión del evento en torno a las siguientes entidades principales y tablas intermedias:

### Entidades Principales

- **`usuarios`**: Almacena los datos de las personas registradas (`id`, `nombre`, `apellido`, `email`, `password` hasheada, `telefono`, `ciudad`, `fechaRegistro`, `rol`: _asistente_, _ponente_, _administrador_ o _staff_).
- **`salas`**: Define los espacios físicos del evento (`id`, `nombre`, `aforo`, `ubicacion`).
- **`charlas`**: Recoge las ponencias programadas (`id`, `id_sala`, `nombre`, `descripcion`, `ponente`, `categoria` [*Tech*, *Salud*, *Business*], `fecha`, `horaInicio`, `horaFin`).
- **`reservas`**: Registra la inscripción de un usuario a una charla (`id`, `id_usuario`, `id_charla`, `estado` [*confirmada*, *cancelada*], `fecha_reserva`, `qr`).
- **`accesos`**: Registra la asistencia real validada en puerta (`id`, `id_usuario`, `id_reserva`, `fecha_hora`).
- **`consultas`**: Almacena mensajes de soporte enviados desde la web (`id`, `id_usuario`, `email`, `asunto`, `mensaje`, `estado`).

### Tablas de Relación (N:M)

- **`asiste`**, **`imparte`** y **`gestiona`**: Vinculan `id_usuario` con `id_charla` según el rol desempeñado.

---

## 🔌 Documentación de la API (Servidor)

La comunicación entre cliente y servidor se realiza mediante peticiones HTTP con intercambio de datos en formato `application/json`. Los endpoints protegidos requieren la cabecera `Authorization: Bearer <token>`.

### Autenticación y Usuarios

| Método | Endpoint        | Acceso      | Descripción                                                                  |
| :----- | :-------------- | :---------- | :--------------------------------------------------------------------------- |
| `POST` | `/api/login`    | Público     | Autentica al usuario con `email` y `password` y devuelve el token de sesión. |
| `POST` | `/api/register` | Público     | Registro de nuevos usuarios con rol `asistente` por defecto.                 |
| `POST` | `/api/logout`   | Autenticado | Cierra la sesión actual e invalida el token.                                 |

**Ejemplo de petición (`POST /api/login`):**

```json
{
  "email": "asistente@sabitech.example",
  "password": "password123"
}
```

### Catálogo de Charlas

| Método   | Endpoint            | Acceso  | Descripción                                                                   |
| :------- | :------------------ | :------ | :---------------------------------------------------------------------------- |
| `GET`    | `/api/charlas`      | Público | Lista todas las charlas disponibles con su sala, horario, categoría y plazas. |
| `GET`    | `/api/charlas/{id}` | Público | Obtiene el detalle completo de una ponencia específica.                       |
| `POST`   | `/api/charlas`      | Admin   | Crea una nueva charla asignada a una sala.                                    |
| `PUT`    | `/api/charlas/{id}` | Admin   | Actualiza los datos de una charla existente.                                  |
| `DELETE` | `/api/charlas/{id}` | Admin   | Elimina una charla del programa.                                              |

### Gestión de Reservas

| Método | Endpoint             | Acceso      | Descripción                                                                              |
| :----- | :------------------- | :---------- | :--------------------------------------------------------------------------------------- |
| `GET`  | `/api/reservas`      | Autenticado | Devuelve las reservas activas del usuario autenticado («Mis charlas»).                   |
| `POST` | `/api/reservas`      | Autenticado | Crea una reserva validando existencia, disponibilidad de aforo y ausencia de duplicados. |
| `PUT`  | `/api/reservas/{id}` | Autenticado | Cancela una reserva propia y libera la plaza en la sala.                                 |

**Ejemplo de petición de reserva (`POST /api/reservas`):**

```json
{
  "id_charla": 1
}
```

**Ejemplo de petición de cancelación (`PUT /api/reservas/{id}`):**

```json
{
  "estado": "cancelada"
}
```

### Control de Asistencia (QR Dinámico)

| Método | Endpoint                | Acceso        | Descripción                                                                                             |
| :----- | :---------------------- | :------------ | :------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/reservas/{id}/qr` | Autenticado   | Genera el token QR vinculado a la reserva y charla con validez temporal de **30 segundos** en servidor. |
| `POST` | `/api/accesos/validar`  | Staff / Admin | Verifica la vigencia y firma del token QR en servidor y registra una asistencia única.                  |

---

## ✅ Verificación del Despliegue y Pruebas

Una vez arrancados los servicios, comprueba que todo funciona correctamente siguiendo estas verificaciones:

1. **Estado de los contenedores:**

   ```bash
   docker compose ps
   ```

   _Resultado esperado:_ Los tres contenedores (`frontend`, `backend`, `db`) deben figurar en estado `Up` / `Running`.

2. **Comprobación de acceso a los servicios:**
   - **Frontend React:** Abrir `http://localhost:5173` en el navegador. Debe cargar la página de inicio y el catálogo de charlas.
   - **Backend API:** Consultar `http://localhost:8080/api/charlas` (vía navegador, `curl` o Postman). Debe devolver un JSON con el listado de charlas cargadas por los _seeders_.

3. **Recorrido funcional básico (Pruebas de aceptación hasta Checkpoint 1):**
   - **Consulta pública:** Navegar por `/charlas` sin iniciar sesión y verificar el detalle de una ponencia.
   - **Autenticación y Reserva:** Iniciar sesión con un usuario de prueba, reservar una plaza y comprobar que aparece en la vista **«Mis charlas»** y persiste tras recargar la página o reiniciar sesión.
   - **Control de duplicados y aforo:** Intentar reservar dos veces la misma charla o reservar en una sala completa; el backend debe rechazar la operación.
   - **Cancelación:** Cancelar una reserva desde el modal de confirmación y verificar que la plaza vuelve a quedar disponible.

4. **Detener el entorno:**
   ```bash
   docker compose down
   ```
   _(Para eliminar también los volúmenes de base de datos, añadir `-v`)._

---

## 📌 Estado del Proyecto (Alcance Primer Checkpoint)

De acuerdo con la planificación establecida hasta el primer hito de control (Noviembre 2026):

- **Implementado y verificado:**
  - Arquitectura Dockerizada (Frontend React/Vite, Backend Laravel/Apache, MySQL).
  - Modelo de datos relacional, migraciones y _seeders_ con datos de laboratorio.
  - Consulta pública del catálogo de charlas y vistas de detalle _responsive_.
  - Inicio de sesión, gestión de estado en cliente y flujo completo de reserva persistente y cancelación con liberación de plaza.
  - Diseño base y visualización inicial de acreditación QR.
- **Planificado para fases posteriores:**
  - Renovación automática cada 30 segundos del QR en interfaz conectada a la validación de caducidad en tiempo real del servidor.
  - Envío automatizado de correos de confirmación con gestión de fallos y reintentos.
  - Vistas específicas de gestión para roles de _Organizador/Administrador_ y escáner para _Staff_.
