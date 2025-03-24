let order = [];
let totalPrice = 0;

function addToOrder(item, price) {
  order.push({ item, price });
  updateOrderSummary();
}

function updateOrderSummary() {
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  orderList.innerHTML = "";
  totalPrice = 0;
  
  order.forEach(({ item, price }, index) => {
    totalPrice += price;
    const li = document.createElement("li");
    li.innerHTML = `${item} - ₹${price} <button onclick="removeItem(${index})">X</button>`;
    orderList.appendChild(li);
  });
  
  totalPriceElement.innerText = totalPrice;
}

function removeItem(index) {
  order.splice(index, 1);
  updateOrderSummary();
}

function confirmOrder() {
  if (order.length === 0) {
    alert("Your order is empty!");
    return;
  }
  let summary = "Your Order:\n";
  order.forEach(({ item, price }) => {
    summary += `${item} - ₹${price}\n`;
  });
  summary += `Total: ₹${totalPrice}`;
  alert(summary);
}

// Tabbed Interface Functionality
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active state from all tabs and panels
    tabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Activate current tab and panel
    tab.classList.add('active');
    document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
  });
});