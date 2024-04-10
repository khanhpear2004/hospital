<?php
    if(isset($_POST["name_modify"])) {
        $name = $_POST["name_modify"];
        echo $name . "<br>";
    }

    if(isset($_POST["phone_number_modify"])) {
        $phone = $_POST["phone_number_modify"];
        echo $phone . "<br>";
    }

    if(isset($_POST["date_of_birth_modify"])) {
        $phone = $_POST["date_of_birth_modify"];
        echo $phone . "<br>";
    }

    if(isset($_POST["gender_modify"])) {
        echo $_POST["gender_modify"] . "<br>";
    }
?>