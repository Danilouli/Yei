<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include_once("FUNC_connect.php");

$userID = $_GET["userID"];
$search = $_GET["search"];

if(isset($userID)) {
	$PDOCon = connectDB();
	if($search == "") {
		$serializedUserBetsID = selectPropertyByID($PDOCon,"users",$userID,"betsIDser");
		$userBetsID = json_decode($serializedUserBetsID);
		$userBets = array();
		$maxBets = max(0,count($userBetsID)-24);
		for($i = $maxBets; $i < count($userBetsID); $i++) {
			$userBets[$i] = selectAllByID($PDOCon,"bets",$userBetsID[$i]);
			$userBets[$i]["playersIDser"] = json_decode($userBets[$i]["playersIDser"]);
			$userBets[$i]["players"] = Array();
			for($j = 0; $j < count($userBets[$i]["playersIDser"]); $j++) {
				$userBets[$i]["players"][$j] = selectAllByID($PDOCon,"users",$userBets[$i]["playersIDser"][$j]);
			}
			$userBets[$i]["proofsIDser"] = json_decode($userBets[$i]["proofsIDser"]);
			$userBets[$i]["proofs"] = Array();
			$userBets[$i]["proofs"] = $userBets[$i]["proofsIDser"];
		}
		$reversedUserBets = array_reverse($userBets);
		echo json_encode($reversedUserBets);
	}
	else {}
	$PDOCon = null;
}
else {
	echo "";
}
?>