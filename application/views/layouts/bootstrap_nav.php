<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ACL</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link href="<?=base_url() ?>assets/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="<?=base_url() ?>assets/css/application.css" rel="stylesheet">

    <style>
      body { padding-top: 60px; }
    </style>

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="<?=base_url() ?>assets/js/jquery-1.7.2.min.js"></script>
    <script src="<?=base_url() ?>assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?=base_url() ?>assets/js/application.js"></script>

    <link rel="shortcut icon" href="<?=base_url() ?>assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?=base_url() ?>assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?=base_url() ?>assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?=base_url() ?>assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?=base_url() ?>assets/ico/apple-touch-icon-57-precomposed.png">

  </head>

  <body>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">ACL</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
<?=$container; ?>
