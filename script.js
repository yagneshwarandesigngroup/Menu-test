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
