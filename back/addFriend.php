<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");
include_once("FUNC_tools.php");

$userID = intval($_GET["userID"]);
$friendID = intval($_GET["friendID"]);
$action = $_GET["action"];

function addReq($PDOCon,$askerID,$wantedUserID) {
	$jsonisedReqs = selectPropertyByID($PDOCon,"users",$askerID,"friendsReqIDser");
	$updatedJsonisedReqs = JSONpush($jsonisedReqs,$wantedUserID);
	updatePropertyByID($PDOCon,"users","friendsReqIDser",$updatedJsonisedReqs,$askerID);
	return $updatedJsonisedReqs;
}

function acceptFriend($PDOCon,$askerID,$wantedUserID) {
	$jsonisedFriends = selectPropertyByID($PDOCon,"users",$askerID,"friendsIDser");
	$updatedJsonisedFriends = JSONpush($jsonisedFriends,$wantedUserID);
	updatePropertyByID($PDOCon,"users","friendsIDser",$updatedJsonisedFriends,$askerID);
	return $updatedJsonisedFriends;
}

function removeReq($PDOCon,$askerID,$userToDeleteID) {
	$jsonisedReqs = selectPropertyByID($PDOCon,"users",$askerID,"friendsReqIDser");
	$updatedJsonisedReqs = JSONremove($jsonisedReqs,$userToDeleteID);
	updatePropertyByID($PDOCon,"users","friendsReqIDser",$updatedJsonisedReqs,$askerID);
	return $updatedJsonisedReqs;
}

function removeFriend($PDOCon,$askerID,$userToDeleteID) {
	$jsonisedFriends = selectPropertyByID($PDOCon,"users",$askerID,"friendsIDser");
	$updatedJsonisedFriends = JSONremove($jsonisedFriends,$userToDeleteID);
	updatePropertyByID($PDOCon,"users","friendsIDser",$updatedJsonisedFriends,$askerID);
	return $updatedJsonisedFriends;
}

if(isset($userID,$friendID,$action)) {
	$PDOCon = connectDB();;
	if($action == "demand") {
		$update = addReq($PDOCon,$userID,$friendID);
		echo $update;	
	}
	else if($action == "accept") {
		$update = acceptFriend($PDOCon,$userID,$friendID);
		acceptFriend($PDOCon,$friendID,$userID);
		removeReq($PDOCon,$friendID,$userID);
		echo $update;	
	}
	else if($action == "removeReq") {
		$update = removeReq($PDOCon,$userID,$userToDeleteID);
		echo $update;
	}
	else if($action == "remove") {
		$update = removeFriend($PDOCon,$userID,$friendID);
		removeFriend($PDOCon,$friendID,$userID);
		echo $update;
	}
	$PDOCon = null;
}	
else {
	echo "";
}

?>