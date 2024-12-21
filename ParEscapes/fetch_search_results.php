<?php
// Database connection
$host = 'localhost';
$dbname = 'par5escapes';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$destination = $_POST['destination'];
$arrivalDate = $_POST['arrivalDate'];

// Query to fetch related golf tour packages
$sql = "SELECT * FROM golf_packages WHERE destination = ? AND available_date <= ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $destination, $arrivalDate);
$stmt->execute();
$result = $stmt->get_result();

$output = "";
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Generate HTML for each card dynamically
        $output .= '<div class="card">';
        $output .= '<img src="' . htmlspecialchars($row['image_url']) . '" alt="Resort Image">';
        $output .= '<h3>' . htmlspecialchars($row['name']) . '</h3>';
        $output .= '<p>' . htmlspecialchars($row['description']) . '</p>';
        $output .= '<div class="price">£' . htmlspecialchars($row['price']) . ' per person</div>';
        $output .= '<button onclick="enquire(' . htmlspecialchars($row['id']) . ')">Enquire</button>';
        $output .= '</div>';
    }
} else {
    $output = "<p>No packages found for your selected destination and date.</p>";
}

echo $output;
$conn->close();
?>