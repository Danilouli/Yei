<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$proofID = intval($_GET["proofID"]);

if(isset($proofID)) {
	$PDOCon = connectDB();
		$proofCommentsID = json_decode(selectPropertyByID($PDOCon,"proofs",$proofID,"commentsIDser"));
		$proofComments = array();
		$maxComments = max(0,count($proofCommentsID)-24);
		for($i = $maxComments; $i < count($proofCommentsID); $i++) {
			$proofComments[$i] = selectAllByID($PDOCon,"comments",$proofCommentsID[$i]);
		}
		$revesedProofComments = array_reverse($proofComments);
		echo json_encode($revesedProofComments);
	$PDOCon = null;
}	
else {
	echo "";
}

?>