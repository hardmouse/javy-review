<?
require 'reviewdb.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cUser = $request->loginId;
$cCode = $request->passwd;
$token = md5(uniqid(round(rand()*25), true));
// Validate.
if(trim($cUser) === '' || trim($cCode) === ''){
    return http_response_code(400);
}
$policies = [];

$sql = "SELECT id, email, nickname, state, image, color FROM user WHERE (id = '{$cUser}' AND mypwd = '{$cCode}') OR (email = '{$cUser}' AND mypwd = '{$cCode}')";
// $sql = "SELECT id, email, mypwd, state FROM user WHERE id = '1' AND mypwd = '1q2w3e4r5t'";
if($result = mysqli_query($con,$sql)){
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $policies[$i]['email']   = $row['email'];
    $policies[$i]['id']      = $row['id'];
    $policies[$i]['nick']    = $row['nickname'];
    $policies[$i]['state']   = $row['state'];
    $policies[$i]['image']   = $row['image'];
    $policies[$i]['token']   = $token;
    $policies[$i]['color']   = $row['color'];
    $setTokenSql = "UPDATE `user` SET `token` = '{$token}' WHERE `user`.`id` = '{$row['id']}'";
    $i++;
  }
  mysqli_query($con,$setTokenSql);
  echo json_encode($policies);
}else{
  http_response_code(404);
}
?>
