<?php
require 'reviewdb.php';

$articleID = null;
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}

$policies = [];
$inject = " ";

$sql = "
    SELECT * FROM post_feedback WHERE post_feedback.feed_post_id = $articleID
";
    
if($result = mysqli_query($con,$sql)){
  $i = 0;
  while($row = mysqli_fetch_assoc($result)){
    $policies[] = $row;
  }
  echo json_encode($policies);
}else{
  http_response_code(400);
}




?>