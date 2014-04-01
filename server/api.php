<?php
	/*
	 * api.php
	 * Backend of the HL-lunch project 
	 * 	(https://github.com/vontils/HL-lunch)
	 * 
	 * Serves .json data residing in 'data' subfolder.
	 * Request parameters:
	 * - y:		Year using the YYYY format
	 * - kw:	Calendar week using two digits (starting at 01)
	 * - c:		Canteen (casino, mensa, ...)
	 * 
	 * The data .json files must match the following pattern:
	 * c-y-kw.json
	 * 
	 * Example:
	 * casino-2013-03.json
	 */
	header('Content-Type: application/json');

	// Get request parameters
	$year 		= $_GET["y"];
	$week 		= $_GET["kw"];
	$canteen	= $_GET["c"];
	
	// Build file name
	$fileName = "./data/{$canteen}-{$year}-{$week}.json";
	
	// Check if file exists, else default to noData.json file
	if(!file_exists($fileName)) {
		$fileName = "noData.json";
	}
	
	// Get and return data
	$data = file_get_contents($fileName);
	
	echo $data;
?>
