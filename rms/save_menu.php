<?php
header('Content-Type: application/json');

// Replace with your real DB connection info
$pdo = new PDO("mysql:host=localhost;dbname=bjm_menu", "root", "");

$data = json_decode(file_get_contents("php://input"), true);

$menuName = trim($data['name']);
$menuPrice = $data['price'];
$ingredients = $data['ingredients'];

if (!$menuName || !$menuPrice || empty($ingredients)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO menus (name, price) VALUES (?, ?)");
    $stmt->execute([$menuName, $menuPrice]);
    $menuId = $pdo->lastInsertId();

    foreach ($ingredients as $ingredient) {
        $ingredient = trim($ingredient);
        if (!$ingredient) continue;

        $stmt = $pdo->prepare("INSERT IGNORE INTO ingredients (name) VALUES (?)");
        $stmt->execute([$ingredient]);

        $stmt = $pdo->prepare("SELECT id FROM ingredients WHERE name = ?");
        $stmt->execute([$ingredient]);
        $ingredientId = $stmt->fetchColumn();

        $stmt = $pdo->prepare("INSERT INTO menu_ingredients (menu_id, ingredient_id) VALUES (?, ?)");
        $stmt->execute([$menuId, $ingredientId]);
    }

    $pdo->commit();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>