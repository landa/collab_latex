<?php

ini_set('display_errors', 1);

$latex = $_POST['code'];

$time = time();

$file = fopen($time . ".tex", "w");
fwrite($file, $latex);

exec("pdflatex " . $time . ".tex");
echo $time;

?>
