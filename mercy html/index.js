let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart({ name, price });
    });
});

function addToCart(laptop) {
    cart.push(laptop);
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-list");
    let total = 0;

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `<li>${item.name} - KSh ${item.price} <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });

    document.getElementById("total-price").innerText = "Total: KSh " + total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("paymentForm").addEventListener('submit', function (e) {
    e.preventDefault();

    const credit = parseInt(document.getElementById("credit").value);
    const total = getTotal();
    // Function to trigger M-Pesa payment
// Get access token from Daraja API
function getAccessToken() {
    return fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('YOUR_CONSUMER_KEY:YOUR_CONSUMER_SECRET')
        }
    })
    .then(response => response.json())
    .then(data => data.access_token)
    .catch(error => {
        console.error("Error generating access token:", error);
        throw new Error("Failed to get access token");
    });
}

// Trigger M-Pesa STK Push payment
function triggerMpesaPayment(phoneNumber, total, accessToken) {
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    
    const payload = {
        "BusinessShortCode": "YOUR_SHORTCODE",
        "Password": "GENERATED_PASSWORD",  // Generate password as described in Daraja API docs
        "Timestamp": "CURRENT_TIMESTAMP",  // Get current timestamp in YYYYMMDDHHMMSS format
        "TransactionType": "CustomerPayBillOnline",
        "Amount": total,
        "PartyA": phoneNumber,  // Phone number sending payment
        "PartyB": "YOUR_SHORTCODE",  // Your shortcode
        "PhoneNumber": phoneNumber,  // Customer's phone number
        "CallBackURL": "YOUR_CALLBACK_URL",  // A valid URL where Safaricom will send the response
        "AccountReference": "ORDER_NUMBER",  // Unique reference for the payment
        "TransactionDesc": "Payment description"  // Description for the transaction
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error triggering payment:", error);
        throw new Error("Failed to initiate payment");
    });
}

// Main checkout function
function checkout() {
    const total = calculateTotal();  // Calculate total cost of items in the cart
    const phoneNumber = prompt("Please enter your phone number for M-Pesa payment:");

    if (!phoneNumber) {
        alert("Phone number is required for payment.");
        return;
    }

    // Get access token and trigger payment
    getAccessToken().then(accessToken => {
        return triggerMpesaPayment(phoneNumber, total, accessToken);
    })
    .then(response => {
        if (response.ResponseCode === "0") {
            // Payment initiated successfully
            alert("Payment initiated. Please complete the payment on your phone.");
        } else {
            // Handle error response
            alert("Payment failed to initiate. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred during payment. Please try again.");
        console.error(error);
    });
}

});

function getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

function clearCart() {
    cart = [];
    updateCart();
}