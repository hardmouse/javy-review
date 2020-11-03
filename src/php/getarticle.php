<?php
require 'reviewdb.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$user = null;
$token = null;
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}
if (isset($_GET['sid'])) {
    $token = $_GET['sid'];
}

if(trim($articleID) === ''){
    return http_response_code(400);
}
$policies = [];
$inject = " ";

$sql = "
    SELECT u.id, u.nickname, b.*, 
    (CASE u.token 
        WHEN  '{$token}' THEN 'true' 
        ELSE 'false' 
    END) AS verify
    FROM user u ,blog_post b 
    WHERE b.post_user_id = u.id AND b.post_uid=$articleID
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
