<?php
    if(isset($_POST["submit_date"])) {
        echo "Ngày đã được booking: " . $_POST["input"] . "<br>";
    }

    if(isset($_POST["pick_doctor"])) {
        echo "Bác sĩ đã được book là: " . $_POST["pick_doctor"] . "<br>";
    }
?>