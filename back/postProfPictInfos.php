<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$userID = $_GET["userID"];
$profPictName = $_GET["profPictName"];
$profPictExt = substr($profPictName, strripos($profPictName, "."));

if(isset($profPictExt,$userID)) {
	$PDOCon = connectDB();
	updatePropertyByID($PDOCon,"users","profPictExt",$profPictExt,$userID);
	echo $profPictExt;
	$PDOCon = null;
}
else {
 	echo "";
}
?>