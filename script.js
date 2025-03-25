// Track order as an object: keys are item names, value is { count, price }
let order = {};
let totalPrice = 0;

// Function to add an item to the order
function addToOrder(item, price, btn) {
  // Optional: add a brief animation to the button
  btn.classList.add("clicked");
  setTimeout(() => btn.classList.remove("clicked"), 300);
  
  if (!order[item]) {
    order[item] = { count: 1, price: price };
  } else {
    order[item].count++;
  }
  updateOrderSummary();
  updateButtonText(item);
}

// Update the text of the button based on the current count for that item
function updateButtonText(item) {
  const btn = document.querySelector(`button[data-item="${item}"]`);
  if (btn) {
    btn.textContent = order[item] ? `Add (${order[item].count})` : "Add";
  }
}

// Update the order summary display and total price
function updateOrderSummary() {
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  orderList.innerHTML = "";
  totalPrice = 0;
  
  for (const item in order) {
    if (order.hasOwnProperty(item)) {
      totalPrice += order[item].price * order[item].count;
      const li = document.createElement("li");
      li.innerHTML = `${item} - ₹${order[item].price} x ${order[item].count} <button onclick="removeItem('${item}')">X</button>`;
      orderList.appendChild(li);
    }
  }
  totalPriceElement.innerText = totalPrice;
}

// Remove an item from the order
function removeItem(item) {
  if (order[item]) {
    order[item].count--;
    if (order[item].count <= 0) {
      delete order[item];
    }
    updateOrderSummary();
    updateButtonText(item);
  }
}

// Confirm order by generating a WhatsApp link with order details
function confirmOrder() {
  // Check if there are any items in the order
  if (Object.keys(order).length === 0) {
    alert("Your order is empty!");
    return;
  }
  
  // Build the order summary message
  let summary = "Your Order:\n";
  for (const item in order) {
    if (order.hasOwnProperty(item)) {
      summary += `${item} - ₹${order[item].price} x ${order[item].count}\n`;
    }
  }
  summary += `Total: ₹${totalPrice}`;
  
  // Encode the message for URL usage
  const encodedMessage = encodeURIComponent(summary);
  
  // Construct the WhatsApp URL using the provided number 9952596777
  const whatsappUrl = `https://wa.me/9952596777?text=${encodedMessage}`;
  
  // Open the WhatsApp chat in a new tab/window
  window.open(whatsappUrl, '_blank');
}

// Tabbed Interface Functionality
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active state from all tabs & panels
    tabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Activate the clicked tab and its corresponding panel
    tab.classList.add('active');
    const panelId = tab.getAttribute('data-tab');
    document.getElementById(panelId).classList.add('active');
  });
});