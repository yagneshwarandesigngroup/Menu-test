// Use an object to track order: keys are item names, value is an object { count, price }
let order = {};
let totalPrice = 0;

function addToOrder(item, price, btn) {
  // Add animation class for button
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

function updateButtonText(item) {
  // Find the button with data-item attribute matching item
  const btn = document.querySelector(`button[data-item="${item}"]`);
  if (btn) {
    btn.textContent = order[item] ? `Add (${order[item].count})` : "Add";
  }
}

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

function confirmOrder() {
  const items = Object.keys(order);
  if (items.length === 0) {
    alert("Your order is empty!");
    return;
  }
  let summary = "Your Order:\n";
  items.forEach(item => {
    summary += `${item} - ₹${order[item].price} x ${order[item].count}\n`;
  });
  summary += `Total: ₹${totalPrice}`;
  alert(summary);
}

// Tabbed Interface Functionality with Animation
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active state from all tabs and panels
    tabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Activate the clicked tab and its corresponding panel
    tab.classList.add('active');
    const activePanel = document.getElementById(tab.getAttribute('data-tab'));
    activePanel.classList.add('active');
  });
});