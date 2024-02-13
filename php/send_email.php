<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "tom.holewijn@protonmail.com";
    $headers = "From: $name <$email>" . "\r\n";
    
    mail($to, $subject, $message, $headers);
    
    echo "Email sent successfully!";
} else {
    echo "Error: Invalid request.";
}
?>