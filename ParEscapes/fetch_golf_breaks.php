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

// Fetch the filter parameter
$filter = $_GET['filter'] ?? 'all';

try {
    if ($filter === 'all') {
        // Fetch all records
        $sql = "SELECT location, CONCAT(DATE_FORMAT(start_date, '%e'), ' to ', DATE_FORMAT(end_date, '%e %b %Y')) AS date, 
                       hotel_name, course_location, nights, rounds, quick_info_1, quick_info_2, quick_info_3, quick_info_4, 
                       price, main_image, tags 
                FROM popular_golf_breaks";
        $stmt = $pdo->query($sql);
    } else {
        // Fetch records with the matching tag
        $sql = "SELECT location, CONCAT(DATE_FORMAT(start_date, '%e'), ' to ', DATE_FORMAT(end_date, '%e %b %Y')) AS date, 
                       hotel_name, course_location, nights, rounds, quick_info_1, quick_info_2, quick_info_3, quick_info_4, 
                       price, main_image, tags 
                FROM popular_golf_breaks 
                WHERE FIND_IN_SET(:filter, tags)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['filter' => $filter]);
    }

    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($packages);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
?>