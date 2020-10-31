<?php
header("Access-Control-Allow-Origin: *.hardmouse.com");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

 

define('DB_HOST', 'hardmouse.com');
define('DB_USER', 'hardm3_javy');
define('DB_PASS', 'irene@0408');
define('DB_NAME', 'hardm3_javyreview');
function connect()
{
  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (mysqli_connect_errno($connect)) {
        die("Failed to connect:" . mysqli_connect_error());
    }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();


function CloseCon() {
    $con -> close();
}

?>