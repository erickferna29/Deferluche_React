<?php
// 1. Permite el acceso desde cualquier lugar (incluyendo tu React)
header("Access-Control-Allow-Origin: *");
// 2. Avisa que mandas datos JSON
header("Content-Type: application/json; charset=UTF-8");
// 3. Permite que el navegador haga la "pre-consulta" (OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Si el navegador pregunta "¿Puedo entrar?" (método OPTIONS), le decimos que sí y paramos
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
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