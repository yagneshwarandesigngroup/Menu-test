const SHEET_ID = "1NKmcZTh1EQ51JrthmIHJHZrcDFY5_-plkFT-5HtYqwA";  // Replace with your actual Sheet ID
const API_KEY = "https://docs.google.com/spreadsheets/d/AIzaSyAjm63UIqqxBLiTYYqnSnaH3BEvXJRSj68/edit";    // Replace with your secure API key

const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

// Fetch menu data from Google Sheets
async function fetchMenuData() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();

        if (data.values) {
            populateMenu(data.values);
        } else {
            console.error("No data found in Google Sheets.");
        }
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
}

// Populate menu dynamically
function populateMenu(menuItems) {
    const menuContainer = document.querySelector(".tab-content");
    menuContainer.innerHTML = "";  // Clear existing content

    let currentCategory = "";
    let categoryPanel;

    menuItems.slice(1).forEach(row => {  // Skip header row
        const [category, itemName, description, price, sku] = row;

        if (category !== currentCategory) {
            // Create a new tab and panel for each category
            currentCategory = category;
            createCategoryTab(category);
            categoryPanel = createCategoryPanel(category);
            menuContainer.appendChild(categoryPanel);
        }

        // Add items to the category panel
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <span class="price">₹${price}</span>
            <button data-sku="${sku}" onclick="addToOrder('${sku}', '${itemName}', ${price}, this)">Add</button>
        `;

        categoryPanel.appendChild(menuItem);
    });
}

// Create category tab
function createCategoryTab(category) {
    const tabContainer = document.querySelector(".tabs");

    const tab = document.createElement("button");
    tab.classList.add("tab");
    tab.textContent = category;
    tab.setAttribute("data-tab", category);
    tab.onclick = () => switchTab(category);

    tabContainer.appendChild(tab);
}

// Create category panel
function createCategoryPanel(category) {
    const panel = document.createElement("div");
    panel.classList.add("tab-panel");
    panel.id = category;
    panel.innerHTML = `<h2>${category}</h2>`;

    return panel;
}

// Switch between tabs
function switchTab(category) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));

    document.querySelector(`[data-tab="${category}"]`).classList.add("active");
    document.getElementById(category).classList.add("active");
}

// Order system
let order = {};
let totalPrice = 0;

// Add item to order
function addToOrder(sku, itemName, price, btn) {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);

    if (!order[sku]) {
        order[sku] = { name: itemName, count: 1, price: price };
    } else {
        order[sku].count++;
    }

    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    const orderList = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    orderList.innerHTML = "";
    totalPrice = 0;

    for (const sku in order) {
        const { name, count, price } = order[sku];
        totalPrice += price * count;

        const li = document.createElement("li");
        li.innerHTML = `
            ${name} - ₹${price} x ${count}
            <button onclick="removeItem('${sku}')">X</button>
        `;
        orderList.appendChild(li);
    }

    totalPriceElement.innerText = totalPrice;
}

// Remove item from order
function removeItem(sku) {
    if (order[sku]) {
        order[sku].count--;
        if (order[sku].count <= 0) {
            delete order[sku];
        }
        updateOrderSummary();
    }
}

// Generate unique order ID
function generateOrderID() {
    return `ORD-${Date.now()}`;
}

// Confirm order and send to WhatsApp
function confirmOrder() {
    if (Object.keys(order).length === 0) {
        alert("Your order is empty!");
        return;
    }

    const orderID = generateOrderID();
    let message = `*** Oceanic F&B ***\nOrder ID: ${orderID}\n\nItems:\n`;

    for (const sku in order) {
        const { name, count, price } = order[sku];
        const lineTotal = price * count;
        message += `SKU: ${sku}\nItem: ${name}\nQty: ${count} x ₹${price} = ₹${lineTotal}\n\n`;
    }

    message += `Total: ₹${totalPrice}\n\nThank you for your order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9952596777?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset order after confirming
    order = {};
    totalPrice = 0;
    updateOrderSummary();
}

// Fetch menu data on page load
document.addEventListener("DOMContentLoaded", fetchMenuData);