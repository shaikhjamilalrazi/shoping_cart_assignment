let cartItems = [];
let cartTotal = 0;

function addToCart(product, quantity) {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
        };
        cartItems.push(cartItem);
    }

    cartTotal += product.price * quantity;
    displayCart();
}

function increaseQuantity(cartItemId) {
    const cartItem = cartItems.find((item) => item.id === +cartItemId);
    if (cartItem) {
        cartItem.quantity++;
        cartTotal += cartItem.price;
        displayCart();
    }
}

function decreaseQuantity(cartItemId) {
    const cartItem = cartItems.find((item) => item.id === +cartItemId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        cartTotal -= cartItem.price;
        displayCart();
    }
}

function removeItem(cartItemId) {
    const cartItemIndex = cartItems.findIndex(
        (item) => item.id === +cartItemId
    );
    console.log(+cartItemId);
    if (cartItemIndex > -1) {
        const cartItem = cartItems[cartItemIndex];
        cartTotal -= cartItem.price * cartItem.quantity;
        cartItems.splice(cartItemIndex, 1);
        displayCart();
    }
}

function clearCart() {
    cartItems = [];
    cartTotal = 0;
    displayCart();
}

function displayCart() {
    const shoppingCart = document.getElementById("shopping-cart");
    shoppingCart.innerHTML = "";
    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        const cartItemElement = document.createElement("li");
        cartItemElement.classList.add("list-group-item");
        cartItemElement.innerHTML = `
      <div class="d-flex justify-content-between">
        <span>${item.name}</span>
        <div>
          <button class="btn btn-sm btn-info decrease-quantity-btn" data-cart-item-id="${
              item.id
          }">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-info increase-quantity-btn" data-cart-item-id="${
              item.id
          }">+</button>
          <button class="btn btn-sm btn-danger remove-item-btn" data-cart-item-id="${
              item.id
          }">Remove</button>
        </div>
        <span>$${itemTotal.toFixed(2)}</span>
      </div>
    `;
        shoppingCart.appendChild(cartItemElement);
    });

    const totalAmount = document.getElementById("total-amount");
    totalAmount.textContent = cartTotal.toFixed(2);
}

export {
    cartItems,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    displayCart,
};
