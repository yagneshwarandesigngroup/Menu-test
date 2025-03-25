document.addEventListener("DOMContentLoaded", () => {
  // Tab switching for slanted tabs
  const tabs = document.querySelectorAll('.tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs & panels
      tabs.forEach(t => t.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Activate clicked tab and corresponding panel
      tab.classList.add('active');
      const panelId = tab.getAttribute('data-tab');
      document.getElementById(panelId).classList.add('active');
    });
  });
});

// Order data structure: { "ItemName": { count: number, price: number }, ... }
let order = {};
let totalPrice = 0;

function addToOrder(item, price, btn) {
  // Animate button
  btn.classList.add("clicked");
  setTimeout(() => btn.classList.remove("clicked"), 300);

  // Increment item count
  if (!order[item]) {
    order[item] = { count: 1, price: price };
  } else {
    order[item].count++;
  }
  updateOrderSummary();
  updateButtonText(item);
}

function updateButtonText(item) {
  const btn = document.querySelector(`button[data-item="${item}"]`);
  if (btn) {
    const count = order[item]?.count || 0;
    btn.textContent = count > 0 ? `Add (${count})` : "Add";
  }
}

function updateOrderSummary() {
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  orderList.innerHTML = "";
  totalPrice = 0;

  for (const item in order) {
    if (order[item].count > 0) {
      const { count, price } = order[item];
      totalPrice += price * count;
      const li = document.createElement("li");
      li.innerHTML = `${item} - ₹${price} x ${count} <button onclick="removeItem('${item}')">X</button>`;
      orderList.appendChild(li);
    }
  }
  totalPriceElement.innerText = totalPrice;
}

function removeItem(item) {
  if (!order[item]) return;
  order[item].count--;
  if (order[item].count <= 0) {
    delete order[item];
  }
  updateOrderSummary();
  updateButtonText(item);
}

function confirmOrder() {
  if (Object.keys(order).length === 0) {
    alert("Your order is empty!");
    return;
  }
  let summary = "Your Order:\n";
  for (const item in order) {
    summary += `${item} - ₹${order[item].price} x ${order[item].count}\n`;
  }
  summary += `Total: ₹${totalPrice}`;
  alert(summary);
  // To send via WhatsApp, uncomment below:
  // const encoded = encodeURIComponent(summary);
  // window.open(`https://wa.me/9952596777?text=${encoded}`, '_blank');
}