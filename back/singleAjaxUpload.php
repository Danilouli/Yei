<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin:*');

$fileInputName = $_POST["fileInputName"];
$uploadDirectory = $_POST["uploadDirectory"]."/";
$acceptedExts = json_decode($_POST["acceptedExts"]);
$maxSize = intval($_POST["maxSize"]);
$newName = $_POST["newName"];
$replace = boolval($_POST["replace"]);
$errorMessage = $_POST["errorMessage"];
$successMessage = $_POST["successMessage"];

$fileTab = $_FILES[$fileInputName];
$filename =$fileTab["name"];
$fileBasename = substr($filename, 0, strripos($filename, '.'));
$fileExt = substr($filename, strripos($filename, '.'));
if($fileExt == ".jpeg") $fileExt = ".jpg"; 
$newfilename = $newName.$fileExt;

$existingFileName = "";
$fileNameExists = false;

for($i = 0; $i < count($acceptedExts); $i++) {
	$fileNameExists = ($fileNameExists OR file_exists($uploadDirectory.$newName.$acceptedExts[$i]));
	if(file_exists($uploadDirectory.$newName.$acceptedExts[$i])) $existingFileName = $uploadDirectory.$newName.$acceptedExts[$i];
}
if(!($fileTab["error"] > 0) AND (in_array($fileExt, $acceptedExts)) AND ($fileTab['size'] < $maxSize)) {
	if($fileNameExists == false) {
		if(move_uploaded_file($fileTab["tmp_name"], $uploadDirectory.$newfilename)) {
			echo $successMessage;
		}
		else {
			echo $errorMessage;			
		}
	}
	else if(($replace == true) AND ($existingFileName != "")) {
		unlink($existingFileName);
		if(move_uploaded_file($fileTab["tmp_name"], $uploadDirectory.$newfilename)) {
			echo $successMessage;
		}
		else {
			echo $errorMessage;		
		}
	}
	else {
		echo $errorMessage;
	}
}
else {
 	echo $errorMessage;
}
?>