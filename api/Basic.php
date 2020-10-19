<?php 
/*
http://phpfaq.ru/pdo
*/
class Basic {
	private $database = "vue05";
	private $user = "mysql";
	private $password = "mysql";

	public function __construct(){	
		// session_start();	
		$pdo_obj = new PDO("mysql:host=localhost;dbname={$this->database};charset=utf8", $this->user, $this->password);
		$this->pdo = $pdo_obj;
	}
}
?>