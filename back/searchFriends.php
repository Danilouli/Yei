<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include_once("FUNC_connect.php");

$userID = $_GET["userID"];
$search = $_GET["search"];

if(isset($userID,$search)) {
	$searchWords = explode(" ",$search);
	for($i=0;$i<count($searchWords);$i++) {
		$searchWords[$i] = "'".$searchWords[$i]."%'";
	}
	$PDOCon = connectDB();
		$result = selectAllByMultiplePattern($PDOCon,"users",["firstName","lastName"],$searchWords);
		echo json_encode($result);
	$PDOCon = null;
}
else {
	echo "";
}
?>