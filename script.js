
let order = [];
let totalPrice = 0;
let sidebarOpen = true;

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
    let listItem = document.createElement("li");
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
  sidebarOpen = !sidebarOpen;
  console.log("Sidebar open:", sidebarOpen);

  if (sidebarOpen) {
    sidebar.classList.remove("hidden");
    bubble.style.display = "none";
    document.body.classList.remove("sidebar-hidden");
  } else {
    sidebar.classList.add("hidden");
    bubble.style.display = "block";
    document.body.classList.add("sidebar-hidden");
  }
}
