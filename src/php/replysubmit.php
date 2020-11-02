<?php
require 'reviewdb.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
$policies = [];
if(isset($postdata) && !empty($postdata)){
    // Extract the data.
    $request = json_decode($postdata);
    

    $articleId = mysqli_real_escape_string($con, trim($request->replyArticleId));
    $replyUserId = mysqli_real_escape_string($con, trim($request->replyUserId));
    $replyContent = mysqli_real_escape_string($con, trim($request->userReply));
    // Validate.
    if(trim($replyUserId) < 0 || trim($replyUserId) === null || trim($replyContent) === ''){
        return http_response_code(400);
    }
    // reply_post_id	reply_user_id	reply_content	reply_image	reply_date

    // create
    $sql = "INSERT INTO `post_reply`
        (`reply_post_id`, `reply_user_id`, `reply_content`, `reply_date`) VALUES 
        ('{$articleId}', '{$replyUserId}', '{$replyContent}', CURRENT_TIMESTAMP)";
      
    if($result = mysqli_query($con,$sql)){
      while($row = mysqli_fetch_assoc($result)){
        $policies[] = $row;
      }
      echo json_encode($policies);
    }else{
      http_response_code(422);
    }
}

?>