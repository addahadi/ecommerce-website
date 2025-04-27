let result = null;

document.addEventListener("DOMContentLoaded", async () => {
  await checkAuthStatus();
  await fetchRating();
  setupRatingSystem();
});

// 🔐 Check Auth
async function checkAuthStatus() {
  try {
    const response = await fetch("http://localhost:8090/auth/status", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    result = await response.json();

    if (result.loggedIn) {
      document.getElementById("Login-button").style.display = "none";
      document.getElementById("profile-button").style.display = "inline-block";
      if (result.user.role === "seller") {
        document.getElementById("add-product-button").style.display = "block";
      }
    } else {
      document.getElementById("Login-button").style.display = "inline-block";
      document.getElementById("profile-button").style.display = "none";
      document.getElementById("rate").style.display = "none";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
}


async function fetchRating() {
  const path = window.location.pathname;
  const productId = path.split("/").pop();
  
  if(productId){
    const requestBody = {
      productId
    }
    try {
      console.log(productId)
      const response = await fetch("http://localhost:8090/products/getrating", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },      
        body: JSON.stringify(requestBody),
      });
      if(response.ok){
        const result = await response.json()
        showRating(result)
      }
    }

    catch(err){
      console.log(err)
    }
  }
}


function showRating(result){
  const stars = document.querySelectorAll(".rated")
  stars.forEach((star) => {
    console.log(result.average)
    if(star.dataset.value <= result.average){
      star.classList.add("hover");
    }
  })
  document.getElementById("review").textContent = "( " +  result.total + " Reviews" + " )"

}



// ⭐ Setup Rating
function setupRatingSystem() {
  const stars = document.querySelectorAll(".star");
  if (!stars || !result?.loggedIn) return;

  let selectedStar = 0;

  const path = window.location.pathname;
  const productId = path.split("/").pop();
  const userId = result.user.Id;
  console.log(userId);
  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      selectedStar = star.dataset.value;

      if (selectedStar && userId) {
        const requestBody = {
          rating: selectedStar,
          productId,
          userId,
        };

        try {
          const response = await fetch("http://localhost:8090/products/rate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          if (response.ok) {
            const text = await response.text();
            console.log("Rating response:", text);
          }
        } catch (err) {
          console.error("Rating error:", err);
        }
      }
    });
  });
}
