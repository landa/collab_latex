<?php

$latex = "\\documentclass{article}\n\\begin{document}\n";
$latex .= "Testing \\LaTeX on SIPB scripts!";
$latex .= "\n\\end{document}";

$file = fopen("temp.tex", "w");
fwrite($file, $latex);

echo $latex . "<br />";
passthru("pdflatex temp.tex");

?>
