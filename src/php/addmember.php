<?php
require 'reviewdb.php';

// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){
  // Extract the data.
  $request = json_decode($postdata);


  // Sanitize.
  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $defaultpass = md5(uniqid($request->lastname, true));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $middlename = mysqli_real_escape_string($con, trim($request->middlename));
  $nickname = mysqli_real_escape_string($con, trim($request->nickname));
  $title = mysqli_real_escape_string($con, trim($request->title));
  $description = mysqli_real_escape_string($con, trim($request->description));
  $dob = mysqli_real_escape_string($con, trim($request->dob));
  $avatar = mysqli_real_escape_string($con, trim($request->avatar));
  $color = mysqli_real_escape_string($con, trim($request->color));
  $active = mysqli_real_escape_string($con, trim($request->active));
  $image = mysqli_real_escape_string($con, trim($request->image));
//   $amount = mysqli_real_escape_string($con, (int)$request->amount);//SAMPLE


  // Validate.
  if(trim($firstname) === '' || trim($lastname) === '')
  {
    return http_response_code(400);
  }


  // Create.
  $sql = "INSERT INTO `user` 
  (`id`, `firstname`, `lastname`, `mypwd`, `email`, `middlename`, `nickname`, `title`, `description`, `dob`, `avatar`, `color`, `state`, `image`) VALUES 
  (NULL, '{$firstname}', '{$lastname}', '{$defaultpass}', '{$email}', '{$middlename}', '{$nickname}', '{$title}', '{$description}', '{$dob}', '{$avatar}', '{$color}', 'hold', '{$image}')";

  if(mysqli_query($con,$sql)){
    http_response_code(201);
    $policy = [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'pass'    => $defaultpass
    ];
    echo json_encode($policy);
  }else{
    http_response_code(422);
  }
}
?>