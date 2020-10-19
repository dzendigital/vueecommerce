<?php 
require_once 'Basic.php';
/**
 * @Catalog
 */
class Catalog extends Basic{
	public function __construct(){
		parent::__construct();
		$this->table = 'catalog';
	}
	public function getList(){
		$table = $this->table;
		$query = $this->pdo->prepare("SELECT * FROM ${table} WHERE `visible`=1");
		$query_result =	$query->execute();
		$catalog_list = $query->fetchAll(PDO::FETCH_ASSOC);
		return $catalog_list;
	}
}
$catalog = new Catalog();
$response = $catalog->getList();
echo json_encode($response);
?>