<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include_once("FUNC_connect.php");

$userID = $_GET["ID"];

if(isset($userID)) {
	$PDOCon = connectDB();
		$serializedUserProofsID = selectPropertyByID($PDOCon,"users",$userID,"proofsIDser");
		$userProofsID = json_decode($serializedUserProofsID);
		$userProofs = array();
		$maxProofs = max(0,count($userProofsID)-12);
		for($i = $maxProofs; $i < count($userProofsID); $i++) {
			$userProofs[$i] = selectAllByID($PDOCon,"proofs",$userProofsID[$i]);
			$userProofs[$i]["commentsIDser"] = json_decode($userProofs[$i]["commentsIDser"]);
			$userProofs[$i]["comments"] = Array();
			$maxComments = max(0,count($userProofs[$i]["commentsIDser"])-24);
			for($j = $maxComments; $j < count($userProofs[$i]["commentsIDser"]); $j++) {
				$userProofs[$i]["comments"][$j] = array_reverse(selectAllByID($PDOCon,"comments",$userProofs[$i]["commentsIDser"][$j]));
			}
		}
		$reversedUserProofs = array_reverse($userProofs);
		echo json_encode($reversedUserProofs);
	$PDOCon = null;
}
else {
	echo "";
}
?>