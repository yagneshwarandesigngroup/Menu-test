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
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item} - ₹${price} <button onclick="removeItem(${index})">X</button>`;
    orderList.appendChild(listItem);
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
  
  let orderSummary = "Your Order:\n";
  order.forEach(({ item, price }) => {
    orderSummary += `${item} - ₹${price}\n`;
  });
  orderSummary += `Total: ₹${totalPrice}`;
  alert(orderSummary);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const bubble = document.getElementById("bubbleToggle");
  
  // Toggle the hidden class
  sidebar.classList.toggle("hidden");
  
  // Display bubble button only when sidebar is hidden
  if (sidebar.classList.contains("hidden")) {
    bubble.style.display = "block";
  } else {
    bubble.style.display = "none";
  }
}