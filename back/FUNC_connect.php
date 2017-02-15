<?php

//Renvoie une connexion directement vers la BDD crabbixfildaniel
	function connectDB() {
		try { 
			$PDOcon = new PDO('mysql:host=crabbixfildaniel.mysql.db;dbname=crabbixfildaniel;charset=utf8','crabbixfildaniel', 'ItsMoreFun1n');
			return $PDOcon;
		}
		catch(Exception $e) { 
			die('Erreur : ' .$e->GetMessage());
			return false;
		}
	}

	function isTaken($PDOCon,$SQLTable,$SQLField,$testField) { 
			$sql = sprintf('SELECT ID FROM %s WHERE %s = :schmurz',
				 $SQLTable,
				 $SQLField);
			$test = $PDOCon->prepare($sql);
			$test->execute(array('schmurz'=>$testField));
			$isTaken = $test->fetch();
			return $isTaken;
			$test->closeCursor();
	}

//fonction qui intéragit dans la bdd crabbixespacemembre dans la table membre
//ajoute juste un nouveau membre, ou permet de modifier ses champs...
	function insertInUsers($PDOCon,$firstName,$lastName,$mail,$password) {
		$passwordSha = sha1($password);
			$insert = $PDOCon->prepare('INSERT INTO users(firstName,lastName,mail,password) VALUES (?,?,?,?)');
			$insert->execute(array($firstName,$lastName,$mail,$passwordSha));
			$insert->closeCursor();
	}

	function insertInComments($PDOCon,$commentValue,$userID,$proofID) {
			$insert = $PDOCon->prepare("INSERT INTO comments(value,writerID,parentProofID) VALUES (?,?,?)");
			$insert->execute(array($commentValue,$userID,$proofID));
			$last_id = $PDOCon->lastInsertId();
			$insert->closeCursor();
			return intval($last_id);
	}

	function insertInProofs($PDOCon,$userID,$parentBetID,$type,$extension,$presText,$proofWidth,$proofHeight) {
			$insert = $PDOCon->prepare("INSERT INTO proofs(type,extension,posterID,parentBetID,presText,proofWidth,proofHeight) VALUES (?,?,?,?,?,?,?)");
			$insert->execute(array($type,$extension,$userID,$parentBetID,$presText,$proofWidth,$proofHeight));
			$last_id = $PDOCon->lastInsertId();
			$insert->closeCursor();
			return intval($last_id);	
	}

//fonction qui selectionne le ou les IDs d'une ou des ligne(s) d'une table selon la valeur d'un champ
//le resultat est un array qui peut nous donner tous les (ou le seul) ID(s) avec la méthode fetch()
	function selectIDByProperty($PDOCon,$SQLTable,$SQLField,$fieldValue){ 
			$sql = sprintf('SELECT ID FROM %s WHERE %s = :schmurz',
				   $SQLTable,$SQLField);
			$select = $PDOCon->prepare($sql);
			$select->execute(array('schmurz'=>$fieldValue));
			return $select;
			$select->closeCursor();
	}

	function selectLastRow($PDOCon,$SQLTable) {
			$sql = sprintf("SELECT * FROM %s ORDER BY ID DESC LIMIT 1",$SQLTable);
			$select = $PDOCon->query($sql);
			$datas = $select->fetch();
			return $datas;
			$select->closeCursor();
	}

	function selectAllBySimplePattern($PDOCon,$SQLTable,$fieldToObserve,$simplePattern) {
		$sql = sprintf("SELECT * FROM %s WHERE %s LIKE %s",$SQLTable,$fieldToObserve,$simplePattern);
		$select = $PDOCon->query($sql);
		$result = Array();
		$i = 0;
		while($datas = $select->fetch()) {
			$result[$i] = $datas;
			$i++;
		}
		return $result;
		$select->closeCursor();
	}

	function selectAllByMultiplePattern($PDOCon,$SQLTable,$fieldsToObserve,$multiplePatterns) {
		$sql = sprintf("SELECT * FROM %s WHERE",$SQLTable);
		$partToAdd = sprintf("%s LIKE %s",$fieldsToObserve[0],$multiplePatterns[0]);
		if(count($fieldsToObserve)>1 AND count($multiplePatterns)>1) {
			for($j=1;$j<count($multiplePatterns);$j++) {
				$newCond = sprintf(" OR %s LIKE %s",$fieldsToObserve[0],$multiplePatterns[$j]);
				$partToAdd = $partToAdd.$newCond;				
			}
			for($i=1;$i<count($fieldsToObserve);$i++) {
				for($j=0;$j<count($multiplePatterns);$j++) {
					$newCond = sprintf(" OR %s LIKE %s",$fieldsToObserve[$i],$multiplePatterns[$j]);
					$partToAdd = $partToAdd.$newCond;				
				}
			}			
		}
		else if(count($multiplePatterns)>1) { 
			for($j=1;$j<count($multiplePatterns);$j++) {
				$newCond = sprintf(" OR %s LIKE %s",$fieldsToObserve[0],$multiplePatterns[$j]);
				$partToAdd = $partToAdd.$newCond;				
			}
		}
		else if(count($fieldsToObserve)>1) { 
			for($i=1;$i<count($fieldsToObserve);$i++) {
				$newCond = sprintf(" OR %s LIKE %s",$fieldsToObserve[$i],$multiplePatterns[0]);
				$partToAdd = $partToAdd.$newCond;				
			}
		}  
		$sql = $sql." ".$partToAdd;
		$select = $PDOCon->query($sql);
		$result = Array();
		$i = 0;
		while($datas = $select->fetch()) {
			$result[$i] = $datas;
			$i++;
		}
		return $result;
		$select->closeCursor();
	}

	function updatePropertyByID($PDOCon,$SQLTable,$SQLField,$valueTuUpdate,$ID) {
			$sql = sprintf("UPDATE %s SET %s= :schmurz WHERE ID= :ID",$SQLTable,$SQLField);
			$req = $PDOCon->prepare($sql);
			$req->execute(array('schmurz'=>$valueTuUpdate,'ID'=>$ID));
	}

//fonction qui connecte le membre avec son email $email et son mdp $mdp pas encore haché,
//renvoie un tableau qui contient son ID si réussi, sinon renvoie null...
	function connectUserAndGetID($PDOCon,$mail,$password) {
		$passwordSha = sha1($password);
			$req = $PDOCon->prepare('SELECT ID FROM users WHERE mail = :mail AND password = :password ');
			$req->execute(array('mail'=>$mail,'password'=>$passwordSha));
			$verif = $req->fetch();
			return $verif["ID"];
			$req->closeCursor();
	}

//fonction qui selectionne tous les champs de la ligne d'ID $ID dans la table $nomTable, qui est dans la bdd $nomBdd,
//renvoie un tableau qui contient la valeur de chaque champ, normal quoi...
	function selectAllByID($PDOCon,$SQLTable,$ID) {
			$sql = sprintf('SELECT * FROM %s WHERE ID = :schmurz',
				   $SQLTable);
			$select = $PDOCon->prepare($sql);
			$select->execute(array('schmurz'=>$ID));
			$result = $select->fetch();
			return $result;
			$select->closeCursor();
	}

	function selectPropertyByID($PDOCon,$SQLTable,$ID,$property) {
			$sql = sprintf('SELECT %s FROM %s WHERE ID = :schmurz',
				   $property,$SQLTable);
			$select = $PDOCon->prepare($sql);
			$select->execute(array('schmurz'=>$ID));
			$result = $select->fetch();
			return $result[$property];
			$select->closeCursor();
	}
?>

















