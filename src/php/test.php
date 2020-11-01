<?php
include 'common.php';
$connect = OpenCon();
$connect->query("SET NAMES 'utf8'");

if (isset($_GET['page'])) {
    $page = (int)$_GET['page'];
}
if (isset($_GET['max'])) {
    $maxpage = (int)$_GET['max'];
}

// SELECT `dt4`,`dt5` FROM `table2` WHERE `dt3`=3 LIMIT 0,1;
$selectSql = "SELECT feed_poster_id, GROUP_CONCAT(CONCAT('(', feed_type,',',c,')') SEPARATOR ';') as counts FROM (SELECT feed_poster_id, feed_type, COUNT(*) as c FROM `post_feedback` JOIN user ON user.id = post_feedback.feed_poster_id GROUP BY feed_type, feed_poster_id) as t GROUP BY feed_poster_id";
$memberData = $connect->query($selectSql);
$emparray = array();
if ($memberData->num_rows > 0) {
//讀取剛才取回的資料
    while ($row = $memberData->fetch_assoc()) {
        $emparray[] = $row;
    }
    echo $page*$maxpage;
    echo json_encode($emparray);
} else {
    echo '0 筆資料';
}
CloseCon($connect);

?>