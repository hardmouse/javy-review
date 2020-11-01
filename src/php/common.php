<?php
header("Access-Control-Allow-Origin: hardmouse.com, javy.hardmouse.com");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function OpenCon(){
    $host = 'hardmouse.com';
    $user = 'hardm5_javys';
    $passwd = 'irene@0408';
    $database = 'hardm5_javysreview';
    $connect = new mysqli($host, $user, $passwd, $database);
 
    if ($connect->connect_error) {
        die("FAIL: " . $connect->connect_error);
    }
 
    return $connect;
}
 
function CloseCon($conn) {
    $conn -> close();
}



?>