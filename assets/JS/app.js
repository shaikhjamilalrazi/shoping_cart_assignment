import products from "./product.js";
import {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
} from "./cart.js";

const productContainer = document.getElementById("product-list");
const shoppingCart = document.getElementById("shopping-cart");

products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
    <div class="d-flex justify-content-between">
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;
    productContainer.appendChild(listItem);
});

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const clearCartButton = document.getElementById("clear-cart-btn");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productId = event.target.dataset.productId;
        const selectedProduct = products.find(
            (product) => product.id === parseInt(productId)
        );
        const quantity = prompt(
            `Enter the quantity for ${selectedProduct.name}:`
        );
        if (quantity && Number(quantity) > 0) {
            addToCart(selectedProduct, Number(quantity));
        }
    });
});

clearCartButton.addEventListener("click", clearCart);

// Event delegation for quantity increase, decrease, and remove buttons
shoppingCart.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("increase-quantity-btn")) {
        const cartItemId = target.dataset.cartItemId;
        increaseQuantity(cartItemId);

        console.log("increase clicked");
    } else if (target.classList.contains("decrease-quantity-btn")) {
        const cartItemId = target.dataset.cartItemId;
        decreaseQuantity(cartItemId);

        console.log("decrease clicked");
    } else if (target.classList.contains("remove-item-btn")) {
        const cartItemId = target.dataset.cartItemId;
        removeItem(cartItemId);
    }
});
