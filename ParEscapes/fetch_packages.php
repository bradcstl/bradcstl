<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$dbname = 'par5escapes';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Retrieve POST data
$location = $_POST['location'] ?? '';
$search_date = $_POST['search_date'] ?? '';

if (empty($location) || empty($search_date)) {
    echo json_encode([]);
    exit;
}

// Query to fetch golf packages based on location and date
$sql = "SELECT * FROM golf_packages WHERE location = :location AND date_available = :search_date";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'location' => $location,
    'search_date' => $search_date
]);

$packages = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $row['recommended_breaks'] = json_decode($row['recommended_breaks'], true); // Decode JSON
// Ensure preview_images is always an array, even if null or missing
$row['preview_images'] = json_decode($row['preview_images'], true) ?? [];
    $packages[] = $row;
}

echo json_encode($packages);