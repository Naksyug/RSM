//pang id ng menu
let menuCounter = 1;


document.addEventListener("DOMContentLoaded", function() {
    limitIngredients();
    addIngredients();
});

function limitIngredients() {
    document.getElementById("ingredientsNum").addEventListener("input", function() {
        let value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 9) this.value = 9;
    });
}

function addIngredients() {
    document.getElementById("ingredientsNum").addEventListener("input", function() {
        let container = document.getElementById("inputContainer");
        let num = parseInt(this.value);
        
        if (num < 1) num = 0;
        container.innerHTML = "";

        for (let i = 0; i < num; i++) {
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.placeholder = `Ingredient ${i + 1}`;
            newInput.className = "ingredientInput";
            container.appendChild(newInput);
            container.appendChild(document.createElement("br"));
        }
    });
}

function createMenuItem() {
    let menuId = `Menu${menuCounter++}`;
    let menuName = document.getElementById("menuName").value.trim();
    let menuPrice = document.getElementById("menuPrice").value.trim();
    let ingredients = document.querySelectorAll(".ingredientInput");

    if (!menuName || !menuPrice || ingredients.length === 0) {
        alert("Please fill in all fields!");
        return;
    }
    //yung div
    let menuDiv = document.createElement("div");
    menuDiv.id = menuId;
    menuDiv.className = "menuItem";
    //yung name
    let nameElement = document.createElement("h2");
    nameElement.id = `menuName-${menuId}`;
    nameElement.textContent = `Name: ${menuName}`;
    menuDiv.appendChild(nameElement);
    //yung price
    let priceElement = document.createElement("p");
    priceElement.id = `menuPrice-${menuId}`;
    priceElement.textContent = `Price: P${menuPrice}`;
    menuDiv.appendChild(priceElement);

    // ingredients
    let ingredient = document.createElement("h4");
    ingredient.textContent="Ingredient List";
    menuDiv.appendChild(ingredient);
    let ingredientsList = document.createElement("ul");
    ingredientsList.id = `ingredients-${menuId}`;

    ingredients.forEach((input, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = input.value.trim();
        listItem.id = `ingredient-${menuId}-${index + 1}`;
        ingredientsList.appendChild(listItem);
    });

    menuDiv.appendChild(ingredientsList);

    // panlagay sa menu
    document.getElementById("menuContainer").appendChild(menuDiv);
}