
document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.querySelector("table");
    const quantityInputs = document.querySelectorAll('.quantity');

    const checkoutButton = document.getElementById("checkout-button");

    // Load cart items from localStorage and display in the table
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCart();


    function displayCart() {
        cartTable.innerHTML = `
            <tr>
                <th>Images</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
            </tr>
        `;

        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" class="table_img"></td>
                <td class="table_title">${item.name}</td>
                <td class="table_price">$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" class="quantity" data-index="${index}"></td>
                <td class="table_subtotal">$${(item.quantity * item.price).toFixed(2)}</td>
                <td><button data-index="${index}"><i class="fa-solid fa-trash remove table_trash"></i></button></td>
            `;

            cartTable.appendChild(row);

            total += item.quantity * item.price;
        });
        const shipping = 0;
        const subtotalElement = document.querySelector('.cart_total-price.subtotal');
        subtotalElement.textContent = '$' + total.toFixed(2);
        const totalElement = document.querySelector('.cart_total-price.total');
        const cartTotal = total + shipping;
        totalElement.textContent = '$' + cartTotal.toFixed(2);
    }
    

    // // Handle quantity changes and removal
    cartTable.addEventListener("input", function (e) {
        if (e.target.classList.contains("quantity")) {
            const index = e.target.getAttribute("data-index");
            const quantity = parseInt(e.target.value);

            if (quantity < 1) {
                e.target.value = 1;
            }

            cart[index].quantity = quantity;
            cart[index].subtotal = quantity * cart[index].price;

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
            updateCartCount();
        }
    });

    cartTable.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);

            // Update cart and localStorage after removal
            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        }
    });


    // Handle checkout button
    // checkoutButton.addEventListener("click", function () {
    //     // Implement checkout logic here (e.g., payment processing)
    //     // For simplicity, we'll just clear the cart for this example
    //     localStorage.removeItem("cart");
    //     cart = [];
    //     displayCart();
    //     alert("Checkout complete. Your cart has been cleared.");
    // });


    //  ADD TOTAL PRICE
 
// Add event listeners to quantity inputs
quantityInputs.forEach((input) => {
  input.addEventListener('input', () => {
    displayCart(); // When quantity changes, update the cart total
  });
});
// Initial update of cart total
displayCart();
});
