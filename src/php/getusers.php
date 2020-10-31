<?php
include 'common.php';
$connect = OpenCon();
$connect->query("SET NAMES 'utf8'");
// SELECT `dt4`,`dt5` FROM `table2` WHERE `dt3`=3 LIMIT 0,1;
$selectSql = "SELECT u.id,u.email,u.nickname,u.title,u.description,u.avatar,u.color,u.state,u.image FROM user u WHERE u.state = 'activated'";
$memberData = $connect->query($selectSql);
$emparray = array();
if ($memberData->num_rows > 0) {
//讀取剛才取回的資料
    while ($row = $memberData->fetch_assoc()) {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
} else {
    echo '0 筆資料';
}
CloseCon($connect);

?>