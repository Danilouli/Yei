<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");
$commentValue = $_POST["comment"];
$userID = intval($_POST["userID"]);
$proofID = intval($_POST["proofID"]);
$numberOfComments = intval($_POST["numberOfComments"]);

if(isset($commentValue,$userID,$proofID,$numberOfComments)) {
	$PDOCon = connectDB();
		$commentID = insertInComments($PDOCon,$commentValue,$userID,$proofID);
		$currentProofCommentsID = json_decode(selectPropertyByID($PDOCon,"proofs",$proofID,"commentsIDser"));
		array_push($currentProofCommentsID,$commentID);
		$serializedUpdatedProofCommentsID = json_encode($currentProofCommentsID);
		updatePropertyByID($PDOCon,"proofs","commentsIDser",$serializedUpdatedProofCommentsID,$proofID);
		$updatedProofCommentsID = json_decode($serializedUpdatedProofCommentsID);
		$updatedProofComments = array();
		$maxComments = max(0,count($updatedProofCommentsID)-24);
		for($i = $maxComments; $i < count($updatedProofCommentsID); $i++) {
			$updatedProofComments[$i] = selectAllByID($PDOCon,"comments",$updatedProofCommentsID[$i]); 
		}
		$reversedUpdatedProofComments = array_reverse($updatedProofComments);
		echo json_encode($reversedUpdatedProofComments);
	$PDOCon = null;
}
else {
 	echo "";
}

?>