<?php
require 'reviewdb.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($_GET['user'])) {
    $user = $_GET['user'];
}

if(isset($postdata) && !empty($postdata)){
    // Extract the data.
    $request = json_decode($postdata);
    
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        // Extract the data.
        $request = json_decode($postdata);
        
        // Sanitize.
        $title = mysqli_real_escape_string($con, trim($request->title));
        $video = mysqli_real_escape_string($con, trim($request->video));
        $images = mysqli_real_escape_string($con, trim($request->images));
        $review = $request->review;
        $catagory = $request->catagory;
        
        
        // Validate.
        if(trim($title) === '' || trim($review) === ''){
            return http_response_code(400);
        }
        
        $uid = md5(uniqid($your_user_login, true));
        
        // create
        $sql = "INSERT INTO `blog_post`
            (`post_uid`, `post_user_id`, `post_catagory`, `post_date`, `post_edit_date`, `post_title`, `post_body`, `post_images`, `post_video_url`) VALUES 
            (NULL, '{$user}', '{$catagory}', CURRENT_TIMESTAMP, NULL, '{$title}', '{$review}', '{$images}', '{$video}')";
        
        if(mysqli_query($con,$sql)){
            http_response_code(201);
            $policy = [
                'postId'=> $uid,
                'poster'=> $user,
                'catagory'=> $catagory,
                'title'=> $title,
                'images'=> $images,
                'review'=> $review
            ];
            echo json_encode($policy);
        }else{
            http_response_code(422);
        }
    }

}


?>