
document.addEventListener("DOMContentLoaded", () => {

  document
    .getElementById("notification-button")
    .addEventListener("click", (event) => {
      event.stopPropagation(); 
      const listContainer = document.getElementById("notificationsList");
      listContainer.innerHTML = "";

      window.notificationsData.forEach((n) => {
        const notifDiv = document.createElement("div");
        notifDiv.className = "notification-item";

        const timestamp = n.created_at
          ? new Date(n.created_at).toLocaleString()
          : "Just now";

        notifDiv.innerHTML = `
            <div class="notification-item-icon">🔔</div>
            <div class="notification-item-content">
                <div class="notification-item-title">${n.title}</div>
                <div class="notification-item-timestamp">${timestamp}</div>
            </div>
        `;

        notifDiv.addEventListener("click", () => openNotificationDetail(n));
        listContainer.appendChild(notifDiv);
      });
    

      const dropdown = document.getElementById("notificationsDropdown");
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

  document.addEventListener("click", (event) => {
    const wrapper = document.getElementById("notification-container");
    if (!wrapper.contains(event.target)) {
      document.getElementById("notificationsDropdown").style.display = "none";
    }
  });

  document
    .getElementById("closeNotificationDetail")
    .addEventListener("click", () => {
      document.getElementById("notificationDetailModal").style.display = "none";
    });

  async function openNotificationDetail(notification) {
    document.getElementById("notifDetailTitle").innerText = notification.title;
    document.getElementById("notifDetailBody").innerText = notification.body;

    if (notification.product_id) {
      const requestBody = {
        productId: notification.product_id,
      };
      console.log(requestBody.productId)
      const response = await fetch(`http://localhost:8090/products/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const product = await response.json();
      console.log(product)
      document.getElementById("notifProductInfo").innerHTML = `
              <h4>${product.data.title}</h4>
              <img src="../../server/uploads/${product.data.imges[0]}" width={200} />
              <p>Price: $${product.data.price}</p>
          `;
    } else {
      document.getElementById("notifProductInfo").innerHTML =
        "<p>No product info</p>";
    }

    // Mark as read
    await fetch(
      `http://localhost:8090/notification/markasread/${notification.id}/read`,
      {
        method: "POST",
      }
    );

    window.fetchNotifications();

    
    document.getElementById("notificationsDropdown").style.display = "none";
    document.getElementById("notificationDetailModal").style.display = "block";
  }
});

window.fetchNotifications = async function () {
  console.log(window.resultData);

  if (window.resultData) {
    const sellerId = window.resultData.user.Id;
    const response = await fetch(
      `http://localhost:8090/notification/getNotifications?seller_id=${sellerId}`
    );
    const notifications = await response.json();

    const unreadCount = notifications.filter((n) => !n.is_read).length;
    const countElem = document.getElementById("notificationCount");
    if (unreadCount > 0) {
      countElem.innerText = unreadCount;
      countElem.style.display = "flex";
    } else {
      countElem.style.display = "none";
    }
    window.notificationsData = notifications;
  }
};
