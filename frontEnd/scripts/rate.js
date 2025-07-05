
document.addEventListener("statusReady", async () => {
  await fetchRating();
  setupRatingSystem();
  StartRating();
});


async function fetchRating() {
  const path = window.location.pathname;
  const productId = path.split("/").pop();
  
  if(productId){
    const requestBody = {
      productId
    }
    try {
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



function setupRatingSystem() {
  const stars = document.querySelectorAll(".star");
  console.log(window.resultData)
  if (!stars || !(window.resultData?.loggedIn)) return;

  let selectedStar = 0;
  console.log("wowowoowowooww")
  const path = window.location.pathname;
  const productId = path.split("/").pop();
  const userId = window.resultData.user.Id;
  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      selectedStar = star.dataset.value;

      if (selectedStar && userId) {
        console.log("Selected star:", selectedStar);
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
            const toast = document.getElementById("toast");
            console.log(text);
            console.log(toast);
            window.showToast("you rated the product ✔️", toast);
          }
        } catch (err) {
          console.error("Rating error:", err);
        }
      }
    });
  });
}


function StartRating(){
    const stars = document.querySelectorAll(".star");
    const rateButton = document.getElementById("rate");
    const rateContainer = document.getElementById("starRating");

    let selectedStarValue = 0;
    let t = 0;
    rateButton.addEventListener("click", () => {
      t++;
      if (t % 2 != 0) {
        rateContainer.style.display = "flex";
      } else rateContainer.style.display = "none";
    });

    stars.forEach((star) => {
      star.addEventListener("mouseover", () => {
        highlightStars(star.dataset.value);
      });
      star.addEventListener("mouseout", () => {
        deHighlightStar(star.dataset.value);
      });
      star.addEventListener("click", () => {
        selectedStarValue = star.dataset.value;
        SelectedStar();
      });
    });
    function highlightStars(value) {
      stars.forEach((star) => {
        if (star.dataset.value <= value) {
          star.classList.add("hover");
        }
      });
    }

    function deHighlightStar(value) {
      stars.forEach((star) => {
        if (star.dataset.value <= value) {
          star.classList.remove("hover");
        }
      });
    }
    function SelectedStar() {
      stars.forEach((star) => {
        star.classList.remove("selected");
        if (star.dataset.value <= selectedStarValue)
          star.classList.add("selected");
      });
    }
}


function showRating(result){
  const stars = document.querySelectorAll(".rated")
  stars.forEach((star) => {
    if(star.dataset.value <= result.average){
      star.classList.add("hover");
    }
  })
  document.getElementById("review").textContent = "( " +  result.total + " Reviews" + " )"

}


