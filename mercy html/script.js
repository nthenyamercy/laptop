// Simulating a shopping cart and payment

let cart = [];

// Function to add items to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart({ name, price });
    });
});

function addToCart(item) {
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    let total = 0;
    cartList.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `<li>${item.name} - KSh ${item.price} <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });
    
    document.getElementById('total-price').innerText = `Total: KSh ${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const availableCredit = prompt("Enter your available credit:");
    
    if (parseInt(availableCredit) >= total) {
        alert("Payment successful!");
        cart = [];
        updateCart();
    } else {
        alert("Insufficient credit!");
    }
});
