<?php
declare(strict_types=1);

// Aceptar unicamente peticiones tipo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Metodo no permitido, Envia el formulario desde la pagina principal');
}

// Funcion que permite leer los campos de texto de manera controlada
function obtenerTexto(string $campo): string {
    $valor = $_POST[$campo] ?? '';

    if (!is_string($valor)) {
        return '';
    }

    return trim($valor);
}

$nombre = obtenerTexto('nombre_completo');
$correo = obtenerTexto('correo');
$telefono = obtenerTexto('telefono');
$asunto = obtenerTexto('asunto');
$mensaje = obtenerTexto('mensaje');

$aceptaTratamiento = isset($_POST['acepta_tratamiento'])
    && $_POST['acepta_tratamiento'] === '1';

// VALIDAR LOS CAMPOS DEL FORMULARIO EN EL SERVIDOR

$errores = [];

if ($nombre === '') {
    $errores[] = 'El nombre completo es obligatorio';
} elseif (mb_strlen($nombre, 'UTF-8') > 120) {
    $errores[] = 'El nombre no puede superar los 120 caracteres';
}

if ($correo === '') {
    $errores[] = 'El correo electronico es obligatorio';
} elseif (
    mb_strlen($correo, 'UTF-8') > 190 || filter_var($correo, FILTER_VALIDATE_EMAIL) === false
) {
    $errores[] = 'El correo electronico no es valido.';
}

if (mb_strlen($telefono, 'UTF-8') > 30) {
    $errores[] = 'El telefono no puede superar los 30 caracteres';
}

$asuntoPermitidos = [
    'Consulta General',
    'Soporte tecnico',
    'Solicitud de informacion',
    'Otro'
];

if (!in_array($asunto, $asuntoPermitidos, true)) {
    $errores[] = 'Seleccione un asunto valido';
}

if ($mensaje === '') {
    $errores[] = 'El mensaje es obligatorio';
} elseif (mb_strlen($mensaje, 'UTF-8') > 3000) {
    $errores[] = 'El mensaje no puede superar los 3000 caracteres';
}

if (!$aceptaTratamiento) {
    $errores[] = 'Debes aceptar el tratamiento de datos para continuar';
}

// PREPARAR UNA RESPUESTA HTML SEGURA (documentacion debe decir  la funcion htmlspecialchars)

function responder(
    string $titulo,
    array $mensajes,
    int $codigoHttp
): never {
    http_response_code($codigoHttp);
    header('Content-type: text/html; charset=UTF-8');

    echo '<!DOCTYPE html>';
    echo '<html lang="es"><head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>' . htmlspecialchars($titulo, ENT_QUOTES | ENT_HTML5, 'UTF-8') . '</title>';
    echo '</head><body>';
    echo '<main style="max-width:650px;margin:40px auto;font-family:Arial, Helvetica, sans-serif;">';
    echo '<h1>' . htmlspecialchars($titulo, ENT_QUOTES | ENT_HTML5, 'UTF-8') . '</h1><ul>';

    foreach ($mensajes as $texto) {
        echo '<li>' . htmlspecialchars($texto, ENT_QUOTES | ENT_HTML5, 'UTF-8') . '</li>';
    }

    echo '</ul>';
    echo '<p><a href="../index.html">Volver al formulario</a></p>';
    echo '</main></body></html>';

    exit;
}

// VALIDAR SI LOS DATOS SON INCORRECTOS

if ($errores !== []) {
    responder('Revisar los datos del formulario', $errores, 422);
}

// CARGAR LA CONEXION E INSERTAR LOS DATOS EN LA BASE DE DATOS

try {
    require_once __DIR__ . '/conexion.php';

    $sql = 'INSERT INTO contactos (nombre_completo, correo, telefono, asunto, mensaje, acepta_tratamiento) 
            VALUES (:nombre, :correo, :telefono, :asunto, :mensaje, :acepta_tratamiento)';

    $consulta = $conexion->prepare($sql);

    $consulta->execute([
        ':nombre' => $nombre,
        ':correo' => $correo,
        ':telefono' => $telefono === '' ? null : $telefono,
        ':asunto' => $asunto,
        ':mensaje' => $mensaje,
        ':acepta_tratamiento' => 1
    ]);

    responder(
        'Mensaje registrado correctamente',
        ['Los datos del formulario se han registrado correctamente.'],
        201
    );

} catch (PDOException $e) {

    error_log('Error al registrar el contacto: ' . $e->getMessage());

    responder(
        'No fue posible registrar el mensaje',
        ['Ocurrio un error al guardar los datos. Intentelo mas tarde.'],
        500
    );
}

?>
