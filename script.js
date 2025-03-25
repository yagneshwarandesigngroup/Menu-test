// Tab switching
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Deactivate all tabs & panels
    tabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Activate the clicked tab & corresponding panel
    tab.classList.add('active');
    const panelId = tab.getAttribute('data-tab');
    document.getElementById(panelId).classList.add('active');
  });
});

// Simple order system placeholders (optional)
let order = [];
let totalPrice = 0;

function confirmOrder() {
  // Just a placeholder alert
  if (order.length === 0) {
    alert("No items selected!");
  } else {
    alert("Order confirmed!\n\n" + JSON.stringify(order, null, 2));
  }
}

/* 
  If you want to implement "Add to Order" buttons, 
  you can replicate the approach used in previous code 
  to dynamically track item additions and update order[].
*/