<?php
// 替代“列目录”的暂行解决方案
$handler = opendir('./');
while (($filename = readdir($handler)) !== false) {
	if ($filename != "." && $filename != ".." && $filename != "index.php" && $filename != "index.html") {
		$files[] = $filename;
	}
}
closedir($handler);
?>
<html>
<head><title>Index of /article/</title></head>
<body bgcolor="white">
<h1>Index of /article/</h1><hr><pre><a href="../">../</a>
<?php foreach ($files as $value) { ?>
<a href="<?php echo $value ?>"><?php echo $value ?></a>                                            XX-XX-XXXX XX:XX                 XXX
<?php } ?>
</pre><hr></body>
</html>