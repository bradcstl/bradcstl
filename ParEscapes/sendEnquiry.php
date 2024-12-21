<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $travel_date = $_POST['travel_date'];
    $party_size = $_POST['party_size'];
    $requirements = $_POST['requirements'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // Email information
    $to = "denis.bicher@gmail.com"; // Replace with the sales manager's email
    $subject = "New Enquiry from " . $first_name . " " . $last_name;
    $message = "
        Enquiry Details:\n
        Name: $first_name $last_name\n
        Email: $email\n
        Phone: $phone\n
        Travel Date: $travel_date\n
        Party Size: $party_size\n
        Requirements: $requirements\n
    ";

    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        // Respond with success message (this will be captured in JavaScript)
        echo 'success';
    } else {
        echo 'error';
    }
}
?>