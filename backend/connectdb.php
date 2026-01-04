<?php
$servername="127.0.0.1";
$username="root";
$pwd="Ef982076522";
$dbname="deferluche";

$conexion= new mysqli($servername,$username,$pwd,$dbname);

if($conexion->connect_error)
{
die("conexion fallida: ".$conexion->connect_error);
}

?>