<?php
    if(!isset($_POST["submit"])) {
        // header("Location: ../login_signup/login.html");
    }

    $email = $_POST["inputMsnv1"];
    $pass = $_POST["inputPassword1"];

    echo $email . "<br>" . $pass;
?>