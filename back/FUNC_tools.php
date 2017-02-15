<?php 
	function JSONpush($JSONstring,$valueToPush) {
		$JSONArr = json_decode($JSONstring);
		array_push($JSONArr, $valueToPush);
		$JSONstring = json_encode($JSONArr);
		return $JSONstring;
	}

	function JSONremove($JSONstring,$valueToRemove) {
		$JSONArr = json_decode($JSONstring);
		$keyToRemove = array_search($valueToRemove, $JSONArr);
		$count = count($JSONArr);
		if($keyToRemove==0) array_shift($JSONArr);
		else array_splice($JSONArr,$keyToRemove,$keyToRemove);
		$JSONstring = json_encode($JSONArr);
		return $JSONstring;
	}
?>