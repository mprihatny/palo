<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// MongoDB Atlas Connection
$mongoConnectionString = 'mongodb+srv://Kapucin:palo123i@kapucin.x3oudev.mongodb.net/?appName=Kapucin';

try {
    $client = new MongoDB\Client($mongoConnectionString, ['serverSelectionTimeoutMS' => 5000]);
    $db = $client->Kapucin; // Database name
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed', 'message' => $e->getMessage()]);
    exit;
}

$request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_path = str_replace('/api/', '', $request_path);
$request_path = trim($request_path, '/');

// GET /api/hero - Return first hero
if ($request_path === 'hero' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $collection = $db->heroes; // or hero collection name
        $hero = $collection->findOne([]);
        
        if ($hero) {
            // Convert MongoDB ID to string
            $hero['_id'] = (string)$hero['_id'];
            echo json_encode($hero);
        } else {
            echo json_encode(['id' => 1, 'title' => 'Welcome to Palostranka', 'subtitle' => 'Your favorite project']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// GET /api/category-heroes - Return all category heroes
if ($request_path === 'category-heroes' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $collection = $db->categoryHeroes; // or categoryheroes
        $result = $collection->find([]);
        $heroes = [];
        
        foreach ($result as $doc) {
            $doc['_id'] = (string)$doc['_id'];
            $heroes[] = $doc;
        }
        
        echo json_encode($heroes);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// GET /api/pages - Return all pages
if ($request_path === 'pages' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $collection = $db->pages;
        $result = $collection->find([]);
        $pages = [];
        
        foreach ($result as $doc) {
            $doc['_id'] = (string)$doc['_id'];
            $pages[] = $doc;
        }
        
        echo json_encode($pages);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// POST /api/cleanup-hero-images - Cleanup
if ($request_path === 'cleanup-hero-images' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode(['success' => true, 'message' => 'Cleanup completed']);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'path' => $request_path]);
?>
