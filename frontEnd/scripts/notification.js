

function notificationDropdown() {
  const Div = document.createElement("div");
  Div.classList.add("notifications-dropdown");
  Div.id = "notificationsDropdown";
  const child = `
      <div class="dropdown-header">Notifications</div>
      <div id="notificationsList" class="notifications-list"></div>
  `;
  Div.innerHTML = child;
  return Div;
}


function notificationDetail(){
  const Div = document.createElement("div");
  Div.classList.add("notification-detail-modal");
  Div.id = "notificationDetailModal";

  const child = `<div class="notification-detail-modal-content">
  <span class="notification-detail-close" id="closeNotificationDetail">&times;</span>
  <h3 id="notifDetailTitle"></h3>
  <p id="notifDetailBody"></p>
  <div id="notifProductInfo" class="notif-product-info"></div>
</div>`;
  Div.innerHTML = child
    return Div
}



document.addEventListener("DOMContentLoaded" , () => {
    document.getElementById("notification-container").appendChild(notificationDropdown())
    document.getElementById("notification-container").appendChild(notificationDetail())

})