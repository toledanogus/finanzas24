<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);
require 'switch.php';

mysqli_query($conn, "INSERT INTO banamexmsi (tipo, Concepto, cantidad, MSI, Mes) VALUES ('MSI', '".$x->newConcept."', '".$x->newValue."', '".$x->aMeses."', $quin)");

$respuesta = mysqli_query($conn, "SELECT Concepto, cantidad, MSI FROM banamexmsi WHERE Mes = $quin");

$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>