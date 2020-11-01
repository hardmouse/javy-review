<?php
require 'reviewdb.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$user = null;
$token = null;
$page = null;
$maxpage = null;
if (isset($_GET['user'])) {
    $user = $_GET['user'];
}
if (isset($_GET['sid'])) {
    $token = $_GET['sid'];
}
if (isset($_GET['page'])) {
    $page = (int)$_GET['page'];
}
if (isset($_GET['numb'])) {
    $maxpage = (int)$_GET['numb'];
}


if(trim($user) === '' || trim($token) === ''){
    return http_response_code(400);
}
$policies = [];
$inject = " ";


$totalSQL = "SELECT 
        u.id, p.post_uid,p.post_user_id,p.post_privilege
        FROM user u,blog_post p 
        WHERE p.post_user_id = u.id AND u.id=$user AND p.post_privilege!='lock'
    ";
$resultCount = mysqli_query($con,$totalSQL);
$num_rows = mysqli_num_rows($resultCount);


$startPage = $page*$maxpage;
    // LIMIT $maxpage OFFSET *$maxpage
$sql = "SELECT 
    u.id,u.nickname,u.title,u.color,u.state,u.token,
    (CASE u.token 
        WHEN  '{$token}' THEN 'true' 
        ELSE 'false' 
    END) AS verify,
    $num_rows AS totalPost,
    p.post_uid,p.post_user_id, p.post_catagory, p.post_date, p.post_edit_date, p.post_title, p.post_body, p.post_images, p.post_layout, p.post_video_url, p.post_privilege
    FROM user u,blog_post p 
    WHERE p.post_user_id = u.id AND u.id=$user AND p.post_privilege!='lock'
    ORDER BY p.post_date DESC
    LIMIT $maxpage OFFSET $startPage
    ";
    
if($result = mysqli_query($con,$sql)){
  while($row = mysqli_fetch_assoc($result)){
    $policies[] = $row;
  }
  echo json_encode($policies);
}else{
  http_response_code(404);
}

?>
