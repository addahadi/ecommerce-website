const statusReadyEvent = new Event("statusReady");

document.addEventListener("DOMContentLoaded", async function () {
  console.log("hhihhihihih")
  try {
    const response = await fetch("http://localhost:8090/auth/status", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    window.resultData = result;
    if (window.fetchNotifications) {
      window.fetchNotifications();

    }
    document.dispatchEvent(statusReadyEvent);

    if (result.loggedIn) {
      document.getElementById("Login-button").style.display = "none";
      document.getElementById("profile-button").style.display = "inline-block";
      if (result.user.role == "seller") {
        document.getElementById("notification-button").style.display = "block";
        document.getElementById("add-product-button").style.display = "block";
      }
    } else {
      document.getElementById("Login-").style.display = "inline-block";
      document.getElementById("profile-button").style.displabuttony = "none";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
});
