<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$userID = intval($_POST["userID"]);
$parentBetID = intval($_POST["parentBetID"]);
$type = $_POST["type"];
$extension = $_POST["extension"];
$presText = $_POST["presText"];
$proofWidth = $_POST["proofWidth"];
$proofHeight = $_POST["proofHeight"];

if(isset($userID,$parentBetID,$type,$extension,$presText,$proofWidth,$proofHeight)) {
	$PDOCon = connectDB();
		$proofID = insertInProofs($PDOCon,$userID,$parentBetID,$type,$extension,$presText,$proofWidth,$proofHeight);
	echo $proofID;
	$PDOCon = null;
}
else {
 	echo "";
}

?>