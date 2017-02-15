<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include_once("FUNC_connect.php");

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$mail = $_POST["mail"];
$password = $_POST["password"];

if(isset($firstName,$lastName,$mail,$password)) {
	$PDOCon = connectDB();
		$mailIsTaken = isTaken($PDOCon,"users","mail",$mail);

		if($mailIsTaken) {
			echo "";
		}
		else {
			insertInUsers($PDOCon,$firstName,$lastName,$mail,$password);
			$userID = connectUserAndGetID($PDOCon,$mail,$password);
			$jsonUserInfos = json_encode(selectAllByID($PDOCon,"users",$userID));
			echo $jsonUserInfos;	
		}
	$PDOCon = null;	
}
else {
	echo "";
}


?>