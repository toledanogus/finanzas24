<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);
require 'switch.php';

mysqli_query($conn, "INSERT INTO banamexmsi (tipo, Concepto, cantidad, MSI, MesRegistro, MesPagar) VALUES ('MSI', '".$x->newConcept."', '".$x->newValue."', '".$x->aMeses."', $quin, 1)");

$respuesta = mysqli_query($conn, "SELECT Concepto, cantidad, MSI, MesRegistro FROM banamexmsi WHERE MSI >= 0");

$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>