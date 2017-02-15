<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$proofID = intval($_GET["proofID"]);
$betID = intval($_GET["betID"]);

if(isset($proofID,$betID)) {
	$PDOCon = connectDB();
		updatePropertyByID($PDOCon,"proofs","commentsIDser","[]",$proofID);
		$currentBetProofsID = json_decode(selectPropertyByID($PDOCon,"bets",$betID,"proofsIDser"));
		array_push($currentBetProofsID,$proofID);
		$jsonisedBetProofsID = json_encode($currentBetProofsID);
		updatePropertyByID($PDOCon,"bets","proofsIDser",$jsonisedBetProofsID,$betID);
		$playersConcerned = json_decode(selectPropertyByID($PDOCon,"bets",$betID,"playersIDser"));
		for($i = 0; $i<count($playersConcerned); $i++) {
			$userProofsID = json_decode(selectPropertyByID($PDOCon,"users",$playersConcerned[$i],"proofsIDser"));
			array_push($userProofsID,$proofID);
			$jsonisedUserProofsID = json_encode($userProofsID);
			updatePropertyByID($PDOCon,"users","proofsIDser",$jsonisedUserProofsID,$playersConcerned[$i]);
		}
	$PDOCon = null;
}
else {
 	echo "";
}

?>