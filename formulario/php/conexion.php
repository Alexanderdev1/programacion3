<?php

declare(strict_types=1);

// CONFIGURACION LOCAL PARA XAMPP
$servidor = 'localhost';
$baseDatos = 'bd_contacto';
$usuario = 'root';
$contrasena = '';

$dsn = "mysql:host={$servidor};dbname={$baseDatos};charset=utf8mb4";

//(DOCUMENTACION QUE HACE EL PDO)
try {
    $conexion = new PDO(
        $dsn,
        $usuario,
        $contrasena,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );

} catch (PDOException $e) {

    error_log('Error de conexion en la base de datos: ' . $e->getMessage());

    // LO QUE HACE ES QUE NO NOS MUESTRE EL ERROR (DOCUMENTACION MOSTRAR LOS DIFERENETS CODIGO DE PETICION)
    http_response_code(500);

    exit('No fue posible conectar a la base de datos. Intentelo mas tarde.');
}

?>
