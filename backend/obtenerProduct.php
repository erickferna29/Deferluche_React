<?php
include_once("connectdb.php");
$orden = $_GET['orden'] ?? '';

switch ($orden) {
    case 'precio_asc':
        $datos = "SELECT * FROM productos ORDER BY Precio ASC";
        break;
    case 'precio_desc':
        $datos = "SELECT * FROM productos ORDER BY Precio DESC";
        break;
    case 'nombre_asc':
        $datos = "SELECT * FROM productos ORDER BY Nombre ASC";
        break;
    case 'nombre_desc':
        $datos = "SELECT * FROM productos ORDER BY Nombre DESC";
        break;
    default:
        $datos = "SELECT * FROM productos"; 
        break;
}

$resultado = $conexion->query($datos);

$fila = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $fila[] = $row; 
    }
}
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite que React lea desde otro puerto
echo json_encode($fila);
?>