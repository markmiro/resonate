<?php
 if(isset($_GET["userid"])) 
    $userid=$_GET["userid"];
    $state=$_GET["state"];
 else $userid=2;
?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>preamble.me</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="static/css/normalize.css">
        <link rel="stylesheet" href="static/css/superslides.css">
        <!-- <link rel="stylesheet" href="static/css/jQuery.divPlaceholder.css"> -->

        <link rel="stylesheet" href="static/css/main.css">
<!--         <link rel="stylesheet" href="static/css/edit.css"> -->

        <script src="static/js/vendor/modernizr-2.6.2.min.js"></script>

        <script>
            currentUserId=<?php echo $userid;?>
            state=<?php echo $state;?>
        </script>
        <div id="templates">
            <script id='intro-slide-template' type='text/template'>
                <li>
                  <!-- <img src="img/map.png" alt=""> -->
                  <div id="intro-slide" class="container">
                    <div class="intro">
                        <h1 class="name editable" data-placeholder="Enter Name">
                            <%= name %>
                        </h1>
                        <div class="detail title editable">
                            <%= title %>
                        </div>
                        <div class="detail divider"></div>
                        <div class="detail location editable">
                            <%= location %>
                        </div>
                        <div class="objective editable">
                            <%= objective %>
                        </div>
                    </div>
                  </div>
                </li>
            </script>

            <script id='contact-slide-template' type='text/template'>
                <li>
                    <div id="contact-slide" class="container bulleted">
                        <div class="title">Contact</div>
                        <ul>
                            <li>
                                <a class="email editable" href="mailto:"><%= email %></a>
                            </li>
                            <li>
                                <a class="phone editable" href="tel:1-<%= phone %>"><%= phone %></a>
                            </li>
                            <li>
                                <a class="linkedin editable" href="<%= linkedin %>">Linked In</a>
                            </li>
                            <li>
                                <a class="add-contact" href="#">Add Contact</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </script>

            <script id='slide-template' type='text/template'>
                <li data-old-title="<%= header %>">
                    <div class="container bulleted">
                        <div class="title editable" data-placeholder="Enter Title"><%= header %></div>
                        <ul>
                            <%= bullets %>
                        </ul>
                    </div>
                </li>
            </script>

            <script id='bullet-template' type='text/template'>
                <li class="editable" data-placeholder="Type something!">
                    <%= bullet %>
                </li>
            </script>

            <script id="date-bullet-template" type="text/template">
                <li>
                    <%= bullet %>
                    <div class="date"><%= date %></div>
                </li>
            </script>

            <script id="link-bullet-template" type="text/template">
                <li>
                    <a href="<%= link %>"><%= bullet %></a>
                </li>
            </script>

            <script id="edit-controls-template" type="text/template">
                <div id="controls">
                    <div class='delete-container'>
                        <a href="#" class="bubble-button  delete-slide">Delete Slide</a>
                    </div>
                    <div class=" insert-slide">
                        <a href="#" class="bubble-button insert after">Insert Slide</a>
                        <!-- <a href="#" class="insert before">Insert Before</a> -->
                    </div>
                    <!-- <a href="#" class="save-slide">Save Slide</a> -->
                </div>
                <a href="#" class="bubble-button edit-slide">Edit</a>
                <a href="index.html" class="login hide-when-editing">Login</a>
            </script>


        </div>



    </head>
    <body class=''>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div id="contact-menu" class="hide-when-editing">
            <a href="#" class="contact-button"></a>
        </div>

<!--         <div id="small-logo" class="hide-when-editing">
            <img src="img/logo.png"></img>
        </div> -->

        <div id="slides">
          <ul class="slides-container">
          </ul>
        </div>

        <div id='edit-controls-container'>
        </div>

        <script src="static/js/jquery.min.js"></script>
        <script src="static/js/underscore.min.js"></script>
        <script src="static/js/plugins.js"></script>
        <script src="static/js/hammer.min.js"></script>
        <script src="static/js/ajax.js"></script>
        <script src="static/js/main.js"></script>
    </body>
</html>
