<?php

include 'common.php';
$connect = OpenCon();
$articleID = null;
if (isset($_GET['article'])) {
    $articleID = $_GET['article'];
}

$connect->query("SET NAMES 'utf8'");

//Retrive Feedback Data
$getFeedSql = "SELECT * FROM post_feedback WHERE post_feedback.feed_post_id = $articleID";
$feedData = $connect->query($getFeedSql);
$feedarray = array();
if ($feedData->num_rows > 0) {
    while ($row = $feedData->fetch_assoc()) {
        $feedarray[] = $row;
    }
    echo json_encode($feedarray);
} else {
    echo '[{}]';
}


// Close Connection
CloseCon($connect);
?>