document.addEventListener('DOMContentLoaded', () => {
    fetchMenus();

    // Calculator functionality
    const display = document.getElementById('display');
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent;

            if (value === 'C') {
                display.value = '';
            } else if (value === '=') {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = 'Error';
                }
            } else {
                display.value += value;
            }
        });
    });
    const clearBtn = document.getElementById('clearSelectedBtn');
    clearBtn.addEventListener('click', () => {
        document.getElementById('selectedItemsBody').innerHTML = '';
        for (const key in selectedItems) {
            delete selectedItems[key];
        }
        updateTotal();
    });
});


function fetchMenus() {
    fetch('get_menus.php')
        .then(res => res.json())
        .then(menus => {
            const menuContainer = document.querySelector('.menuButtons');
            menus.forEach(menu => {
                const btn = document.createElement('button');
                btn.textContent = `${menu.name} - ₱${menu.price}`;
                btn.addEventListener('click', () => addToSelected(menu));
                menuContainer.appendChild(btn);
            });
        })
        .catch(err => {
            console.error('Failed to load menus:', err);
        });
}

const selectedItems = {};

function addToSelected(menu) {
    const tbody = document.getElementById('selectedItemsBody');

    if (selectedItems[menu.id]) {
        selectedItems[menu.id].quantity += 1;
        const row = document.getElementById(`row-${menu.id}`);
        row.querySelector('.qty').textContent = selectedItems[menu.id].quantity;
    } else {
        selectedItems[menu.id] = {
            id: menu.id,
            name: menu.name,
            price: parseFloat(menu.price),
            quantity: 1
        };

        const row = document.createElement('tr');
        row.id = `row-${menu.id}`;
        row.innerHTML = `
            <td>${menu.id}</td>
            <td class="qty">1</td>
            <td>${menu.name}</td>
            <td>₱${menu.price}</td>
        `;
        tbody.appendChild(row);
    }

    updateTotal();
}

function updateTotal() {
    let total = 0;
    for (const key in selectedItems) {
        total += selectedItems[key].price * selectedItems[key].quantity;
    }
    document.getElementById('totalPrice').textContent = `₱${total.toFixed(2)}`;
}



