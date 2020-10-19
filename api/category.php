<?php 
$categories = array(
	0 => array(
		'id' => 1,
		'name' => 'Одежда',
		'link' => 'wear',
		'isVisible' => false,
	),
	// 0 => array(
	// 	'id' => 1,
	// 	'name' => 'Одежда',
	// 	'link' => 'wear',
	// 	'isVisible' => false,
	// 	'children' => array(
	// 		0 => array(
	// 			'id' => 4,
	// 			'name' => 'Мужская',
	// 			'link' => 'men'
	// 		),
	// 	)
	// ),
	1 => array(
		'id' => 2,
		'name' => 'Аксессуары',
		'link' => 'accessories',
		'isVisible' => false,
	),
	2 => array(
		'id' => 3,
		'name' => 'Обувь',
		'link' => 'shoes',
		'isVisible' => false,
	),
);
echo json_encode($categories);
?>