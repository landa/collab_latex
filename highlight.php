<?php

ini_set('display_errors', 1);

$code = stripslashes($_POST['code']);
highlight_string("<?php\n" . $code . "\n?>");

file_get_contents("http://landa.scripts.mit.edu/cl.php?code=" . urlencode($code));

?>