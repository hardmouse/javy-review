<?php
require 'reviewdb.php';

$articleID = null;
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}

$policies = [];
$inject = " ";

$sql = "
    SELECT r.*, u.id, u.nickname FROM post_reply r, user u WHERE r.reply_post_id = $articleID AND r.reply_user_id = u.id
    ORDER BY r.reply_date DESC
";
    
if($result = mysqli_query($con,$sql)){
  while($row = mysqli_fetch_assoc($result)){
    $policies[] = $row;
  }
  echo json_encode($policies);
}else{
  http_response_code(400);
}





?>
