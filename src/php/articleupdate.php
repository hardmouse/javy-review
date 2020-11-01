<?php
require 'reviewdb.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$imageJSON = array();
$articleID = null;
$token = null;
$updateDatetime = date('Y-m-d H:i:s');
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}
if (isset($_GET['sid'])) {
    $token = $_GET['sid'];
}

$catagory = mysqli_real_escape_string($con, trim($request->catagory));
$title = mysqli_real_escape_string($con, trim($request->title));
$review = mysqli_real_escape_string($con, trim($request->review));
$imageUrl0 = mysqli_real_escape_string($con, trim($request->imageUrl0));
$imageUrl1 = mysqli_real_escape_string($con, trim($request->imageUrl1));
$imageUrl2 = mysqli_real_escape_string($con, trim($request->imageUrl2));
$imageName0 = mysqli_real_escape_string($con, trim($request->imageName0));
$imageName1 = mysqli_real_escape_string($con, trim($request->imageName1));
$imageName2 = mysqli_real_escape_string($con, trim($request->imageName2));
$layout = mysqli_real_escape_string($con, trim($request->layout));
$videourl = mysqli_real_escape_string($con, trim($request->video));

if($imageUrl0){
    $data0 = ['name' => $imageName0, 'photo' => $imageUrl0];
    array_push($imageJSON, $data0);
}
if($imageUrl1){
    $data1 = ['name' => $imageName1, 'photo' => $imageUrl1];
    array_push($imageJSON, $data1);
}
if($imageUrl2){
    $data2 = ['name' => $imageName2, 'photo' => $imageUrl2];
    array_push($imageJSON, $data2);
}
if(trim($articleID) === '' || trim($token) === ''){
    return http_response_code(400);
}
$imgJsonStr = json_encode($imageJSON);

$policies = [];
$inject = " ";
$sql = "
    UPDATE blog_post
    SET 
    post_edit_date = '{$updateDatetime}',
    post_catagory = '{$catagory}',
    post_title = '{$title}',
    post_body = '{$review}',
    post_video_url = '{$videourl}',
    post_layout = '{$layout}',
    post_images = '{$imgJsonStr}'
    WHERE blog_post.post_uid = $articleID
    ";
    
if($result = mysqli_query($con,$sql)){
    $policies = "[{\"stat\":\"success\"}]";
//   $i = 0;
//   while($row = mysqli_fetch_assoc($result)){
//     $policies[] = $row;
//   }
  echo json_encode($imageJSON);
}else{
  http_response_code(404);
}

?>