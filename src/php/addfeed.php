<?
//INSERT INTO `post_feedback` (`id`, `user`, `type`, `post_id`) VALUES (NULL, '1', 'like', '2');

require 'reviewdb.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  // Extract the data.
  $request = json_decode($postdata);

  $postId = mysqli_real_escape_string($con, trim($request->postId));
  $feedtype = mysqli_real_escape_string($con, trim($request->feedtype));
  $userId = $request->userId;
  // Validate.
  if(trim($postId) === '' || trim($feedtype) === '' || trim($userId) === '')
  {
    return http_response_code(400);
  }


  // Create.
  $sql = "INSERT INTO `post_feedback` (`feed_id`, `feed_user_id`, `feed_type`, `feed_post_id`) 
  VALUES (NULL, '{$userId}', '{$feedtype}', '{$postId}');";
  if(mysqli_query($con,$sql)){
    http_response_code(201);
    $policy = [
        'postId' => $postId,
        'feedtype' => $feedtype,
        'userId' => $userId
    ];
    echo json_encode($policy);
  }else{
    http_response_code(422);
  }
}else{
    echo '[{}]';
}


?>