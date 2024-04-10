<?php
    // if(!isset($_POST["submit"])) {
    //     header("Location: ../signup.html");
    // }

    $firstName = $_POST["inputFirstName"];
    $lastName = $_POST["inputLastName"];
    $email = $_POST["inputEmail"];
    $pass = $_POST["inputPassword"];
    $BHYT = $_POST["inputBHYT"];
    $gender = $_POST["inputGender"];

    echo "<p>Họ và Tên: " . $firstName . $lastName . "</p>";
    echo "<p> Email: " . $email . "</p>";
    echo "<p> Mật Khẩu: " . $pass . "</p>";
    echo "<p> Bảo Hiểm Y Tế: " . $BHYT . "</p>";
    echo "<p> Giới Tính: " . $gender . "</p>";
?>