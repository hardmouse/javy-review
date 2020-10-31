<?php
/**
 * Returns the list of policies.
 */
require 'reviewdb.php';

$policies = [];
$sql = "SELECT * FROM user";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $policies[$i]['firstname']  = $row['firstname'];
    $policies[$i]['lastname']   = $row['lastname'];
    $policies[$i]['nickname']   = $row['nickname'];
    $i++;
  }

  echo json_encode($policies);
}
else
{
  http_response_code(404);
}
?>