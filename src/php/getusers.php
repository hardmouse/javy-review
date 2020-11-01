<?php
require 'reviewdb.php';
$sql = "SELECT u.id,u.email,u.nickname,u.title,u.description,u.avatar,u.color,u.state,u.image,u.points,u.reward FROM user u WHERE u.state = 'activated' OR u.state = 'locked'";
if($result = mysqli_query($con,$sql)){
  while($row = mysqli_fetch_assoc($result)){
    $policies[] = $row;
  }
  echo json_encode($policies);
}else{
  http_response_code(400);
}



// include 'common.php';
// $connect = OpenCon();
// $connect->query("SET NAMES 'utf8'");
// $selectSql = "SELECT u.id,u.email,u.nickname,u.title,u.description,u.avatar,u.color,u.state,u.image,u.points,u.reward FROM user u WHERE u.state = 'activated'";
// $memberData = $connect->query($selectSql);
// $emparray = array();
// if ($memberData->num_rows > 0) {
// //讀取剛才取回的資料
//     while ($row = $memberData->fetch_assoc()) {
//         $emparray[] = $row;
//     }
//     echo json_encode($emparray);
// } else {
//     echo '0 筆資料';
// }
// CloseCon($connect);

?>



