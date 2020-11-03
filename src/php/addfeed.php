<?
require 'reviewdb.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    // Extract the data.
    $request = json_decode($postdata);
    
    $postId = mysqli_real_escape_string($con, trim($request->postId));
    $feedtype = mysqli_real_escape_string($con, trim($request->feed_type));
    $userId = $request->userId;
    // Validate.
    if(trim($postId) === '' || trim($feedtype) === '' || trim($userId) === ''){
        return http_response_code(400);
    }


    $sql_chk = "SELECT * FROM `post_feedback` WHERE feed_post_id=$postId AND feed_poster_id=$userId";

  
    if(mysqli_num_rows(mysqli_query($con,$sql_chk)) > 0){
          $sql = "UPDATE post_feedback SET post_feedback.feed_type='{$feedtype}' WHERE post_feedback.feed_post_id='{$postId}' AND post_feedback.feed_poster_id='{$userId}'";
    }else{
          $sql = "INSERT INTO `post_feedback` (`feed_id`, `feed_poster_id`, `feed_type`, `feed_post_id`) 
          VALUES (NULL, '{$userId}', '{$feedtype}', '{$postId}')";
    }
    if(mysqli_query($con,$sql)){
        $sqlFinal = "
            SELECT * FROM post_feedback WHERE post_feedback.feed_post_id = $postId
        ";
        if($result = mysqli_query($con,$sqlFinal)){
          while($row = mysqli_fetch_assoc($result)){
            $policies[] = $row;
          }
          echo json_encode($policies);
        }else{
          http_response_code(422);
        }
    }else{
        http_response_code(422);
    }
}else{
    echo '[{}]';
}


?>
