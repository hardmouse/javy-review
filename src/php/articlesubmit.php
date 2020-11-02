<?php
require 'reviewdb.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
$imageJSON = array();

if (isset($_GET['user'])) {
    $user = $_GET['user'];
}

// if(isset($postdata) && !empty($postdata)){
// Extract the data.
    // $postdata = file_get_contents("php://input");
    
$request = json_decode($postdata);
    
if(isset($postdata) && !empty($postdata)){
    // Extract the data.
    $request = json_decode($postdata);
    
    // Sanitize.
    $title = mysqli_real_escape_string($con, trim($request->title));
    $video = mysqli_real_escape_string($con, trim($request->video));
    $layout = mysqli_real_escape_string($con, trim($request->layout));
    // $images = mysqli_real_escape_string($con, trim($request->images));
    $imageUrl0 = mysqli_real_escape_string($con, trim($request->imageUrl0));
    $imageUrl1 = mysqli_real_escape_string($con, trim($request->imageUrl1));
    $imageUrl2 = mysqli_real_escape_string($con, trim($request->imageUrl2));
    $imageDesp0 = mysqli_real_escape_string($con, trim($request->imageDesp0));
    $imageDesp1 = mysqli_real_escape_string($con, trim($request->imageDesp1));
    $imageDesp2 = mysqli_real_escape_string($con, trim($request->imageDesp2));
    $review = $request->review;
    $catagory = $request->catagory;
    
    if($imageUrl0){
        $data0 = ['name' => $imageDesp0, 'photo' => $imageUrl0];
        array_push($imageJSON, $data0);
    }
    if($imageUrl1){
        $data1 = ['name' => $imageDesp1, 'photo' => $imageUrl1];
        array_push($imageJSON, $data1);
    }
    if($imageUrl2){
        $data2 = ['name' => $imageDesp2, 'photo' => $imageUrl2];
        array_push($imageJSON, $data2);
    }
    $imgJsonStr = json_encode($imageJSON);
    
    // if(trim($articleID) === '' || trim($token) === ''){
    //     return http_response_code(400);
    // }

    // Validate.
    if(trim($title) === '' || trim($review) === ''){
        return http_response_code(400);
    }
    
    $uid = md5(uniqid($your_user_login, true));
    
    // create
    $sql = "INSERT INTO `blog_post`
        (`post_uid`, `post_user_id`, `post_catagory`, `post_date`, `post_edit_date`, `post_title`, `post_body`, `post_images`, `post_layout`, `post_video_url`) VALUES 
        (NULL, '{$user}', '{$catagory}', CURRENT_TIMESTAMP, NULL, '{$title}', '{$review}', '{$imgJsonStr}', '{$layout}', '{$video}')";
    
    if(mysqli_query($con,$sql)){
        http_response_code(201);
        $policy = [
            'postId'=> $uid,
            'poster'=> $user,
            'catagory'=> $catagory,
            'title'=> $title,
            'layout'=> $layout,
            'images'=> $imgJsonStr,
            'review'=> $review
        ];
        echo json_encode($policy);
    }else{
        http_response_code(422);
    }
}

// }


?>