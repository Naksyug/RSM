<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=localhost;dbname=bjm_menu", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT id, name, price FROM menus ORDER BY name ASC");
    $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($menus);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
