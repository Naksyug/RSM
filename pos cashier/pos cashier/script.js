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

function addToSelected(menu) {
    const container = document.getElementById('selectedItems');
    const item = document.createElement('p');
    item.textContent = `${menu.name} - ₱${menu.price}`;
    container.appendChild(item);
}

// Clear selected items when the button is clicked
document.addEventListener('DOMContentLoaded', () => {
    // existing code...

    const clearBtn = document.getElementById('clearSelectedBtn');
    clearBtn.addEventListener('click', () => {
        document.getElementById('selectedItems').innerHTML = '';
    });
});

