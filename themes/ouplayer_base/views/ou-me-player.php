<?php

?>
<!doctype html><html lang="en"><meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta charset="utf-8" /><title><?php echo $params->title ?> | <?php echo site_name() ?></title>
<?php

$this->load->theme_view('oup-mep-head');
$this->load->theme_view('oup-mep-body');
$this->load->theme_view('oup-end-javascript');

/*
require_once 'oup-views/oup-mephead.php';
require_once 'oup-views/oup-mepbody.php';
require_once 'oup-views/oup-end-script.js.php';
*/

?>
</html>
<!--
<?php echo basename(__FILE__) ?>

-->
