<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include_once("FUNC_connect.php");

$mail = $_POST["mail"];
$password = $_POST["password"];

if(isset($mail,$password)) {
	$PDOCon = connectDB();
	$userID = connectUserAndGetID($PDOCon,$mail,$password);	
	if($userID) {
		$jsonUserInfos = json_encode(selectAllByID($PDOCon,"users",$userID));
		echo $jsonUserInfos;
	}
	else {
		echo "";
	}
}
else {
	echo "";
}

?>