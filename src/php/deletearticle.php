<?php
require 'reviewdb.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$articleID = null;
$token = null;
$updateDatetime = date('Y-m-d H:i:s');
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}
if (isset($_GET['sid'])) {
    $token = $_GET['sid'];
}
$policies = [];
$inject = " ";
$sql = "
    UPDATE blog_post
    SET 
    post_privilege = 'lock'
    WHERE blog_post.post_uid = $articleID
    ";
    
if($result = mysqli_query($con,$sql)){
    $policies = "[{\"stat\":\"success\"}]";
//   while($row = mysqli_fetch_assoc($result)){
//     $policies[] = $row;
//   }
  echo json_encode($imageJSON);
}else{
  http_response_code(404);
}

?>