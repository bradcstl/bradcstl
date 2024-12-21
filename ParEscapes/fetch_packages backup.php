<?php
header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'par5escapes';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Retrieve POST data
$location = $_POST['location'] ?? '';

if (empty($location)) {
    echo json_encode([]);
    exit;
}

// Fetch packages based on location
try {
    $sql = "SELECT location, CONCAT(DATE_FORMAT(start_date, '%e'), ' to ', DATE_FORMAT(end_date, '%e %b %Y')) AS date, 
                   hotel_name, course_location, nights, rounds, quick_info_1, quick_info_2, quick_info_3, quick_info_4, 
                   price, main_image, preview_images, tags 
            FROM golf_packages
            WHERE location LIKE :location";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['location' => "%$location%"]);
    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode JSON fields
    foreach ($packages as &$package) {
        $package['preview_images'] = json_decode($package['preview_images'], true);
    }

    echo json_encode($packages);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
?>