<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
    <h1>Welcome to BJM</h1>
    <div class="menu ">
        <h3 class="hide">Menu List</h3>
    </div>
    <h3>All Ingredients</h3>

<table border="1" cellpadding="10">
    <tr>
        <th>ID</th>
        <th>Ingredient Name</th>
    </tr>

    <?php
    // Connect to the database
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=bjm_menu", "root", "");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Query all ingredients
        $stmt = $pdo->query("SELECT * FROM ingredients ORDER BY id ASC");

        // Loop through and show each row
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['id']) . "</td>";
            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
            echo "</tr>";
        }

    } catch (PDOException $e) {
        echo "<tr><td colspan='2'>Error: " . $e->getMessage() . "</td></tr>";
    }
    ?>

    <a href="menu_list.php">
    <button>View Menu List</button>
</a>
</table>
</table>

<h3>Functions</h3>
<button onclick="addMenu()">Add menu</button>
<form>
            <h4>Menu name</h4>
            <input type="text" class="hide" id="menuName" placeholder="Enter menu item name">
            <h4>Menu price</h4>
            <input type="number" class="hide" id="menuPrice" placeholder="Enter price">
            <h4>Ingredients</h4>
            <input type="number" class="hide" id="ingredientsNum" min="1"  placeholder="Number of ingredients">
            <div id="inputContainer"></div>
        </form>
        <button onclick="createMenuItem()">Create Menu Item</button>

    <div id="menuContainer"></div>
        
    </div>
    <div class="orderList">
        <h3>Order List</h3>
</form>
</body>
</html>