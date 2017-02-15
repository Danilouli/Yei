<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$PDOCon = connectDB();
$test = selectLastRow($PDOCon,"proofs");
echo $test["ID"];
$PDOCon = null;

?>