// Format price in Cedis
function formatPrice(price) {
    return `₵${price.toFixed(2)}`;
}

// Ghanaian menu
const menuItems = [
    { id: 1, name: "Jollof Rice with Chicken", price: 30.00 },
    { id: 2, name: "Banku with Tilapia", price: 35.50 },
    { id: 3, name: "Fufu with Light Soup", price: 28.00 },
    { id: 4, name: "Waakye with Fish", price: 25.00 },
    { id: 5, name: "Kelewele", price: 12.50 },
    { id: 6, name: "Kenkey with Fish & Pepper Sauce", price: 20.00 },
    { id: 7, name: "Chibom", price: 15.00 }
];

const cart = [];
const menuContainer = document.querySelector('.menu-items');
const cartContainer = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');
const orderForm = document.getElementById('order-form');
const orderMessage = document.getElementById('order-message');
const checkoutBtn = document.getElementById('checkout');

// Render menu
menuItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `<span>${item.name} - ${formatPrice(item.price)}</span>
                     <button onclick="addToCart(${item.id})">Add to Cart</button>`;
    menuContainer.appendChild(div);
});

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const cartItem = cart.find(c => c.id === id);
    if (cartItem) cartItem.quantity += 1;
    else cart.push({ ...item, quantity: 1 });
    renderCart();
}

function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<span>${item.name} x ${item.quantity}</span>
                         <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartContainer.appendChild(div);
    });
    totalElement.textContent = formatPrice(total);
}

function removeFromCart(id) {
    const index = cart.findIndex(c => c.id === id);
    if (index > -1) cart.splice(index, 1);
    renderCart();
}

// Handle order
orderForm.addEventListener('submit', e => {
    e.preventDefault();
    if (cart.length === 0) { alert("Cart is empty!"); return; }
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    orderMessage.textContent = `Thank you ${name}! Your order of ${formatPrice(total)} is on its way! 🇬🇭`;
    cart.length = 0;
    renderCart();
    orderForm.reset();
});

// Scroll to order
checkoutBtn.addEventListener('click', () => {
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});