<?php
$servername="127.0.0.1";
$username="root";
$pwd="Ef982076522";
$dbname="deferluche";

$conexion= new mysqli($servername,$username,$pwd,$dbname);

if($conexion->connect_error) {
    header("Access-Control-Allow-Origin: *"); // Mandamos el permiso aunque falle
    header("Content-Type: application/json");
    die(json_encode(["error" => "Conexión fallida: " . $conexion->connect_error]));
}

?>