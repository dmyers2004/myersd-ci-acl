<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    {header_meta}

    <title>{application_name}</title>
    {header_css}
    <link href="<?=base_url() ?>assets/css/application.css" rel="stylesheet">

    <script src="<?=base_url() ?>assets/js/jquery-1.7.2.min.js"></script>
    {header_js}
    <script src="<?=base_url() ?>assets/js/application.js"></script>
    
    <?=$this->asset->header() ?>
    <?=$flash_msg ?>

    <link rel="shortcut icon" href="<?=base_url() ?>assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?=base_url() ?>assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?=base_url() ?>assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?=base_url() ?>assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?=base_url() ?>assets/ico/apple-touch-icon-57-precomposed.png">
  </head>
<body>