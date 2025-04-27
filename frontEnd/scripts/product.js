document.addEventListener("DOMContentLoaded" , async () => {
    try {
        const response = await fetch("http://localhost:8090/auth/status" , {
            method : "GET",
            credentials:'include'
        });
        const result = await response.json()
        if(result.loggedIn){
            document.getElementById("profile-button").style.display = "block";
            document.getElementById("Login-button").style.display = "none";
        }
    }

    catch(err) {
        console.log(err)
    }
})


document.addEventListener("DOMContentLoaded" , async () => {
    
    const path = window.location.pathname;

    const parts = path.split("/");

    const productId = parts[parts.length - 1];
    console.log(productId)


    if(!productId) return 

    const requestBody = {
        productId
    }

    try {
        const response = await fetch("http://localhost:8090/products/get", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if(response.ok){
            const result = await response.json()
            const {data} = result
            showProductInfo(data)
        }
    }
    catch(err) {
        console.log(err)
    }
})


function showProductInfo(data){
    document.getElementById("mainImg").src = `/server/uploads/${data.imges[0]}`
    document.getElementById("title").textContent = data.title
    document.getElementById("description").textContent = data.descr; 
    document.getElementById("price").textContent = data.price + "$";
    document.getElementById("date").textContent = data.created_at;
    document.getElementById("stock").textContent = data.stock;
    document.getElementById("category").textContent = data.category;

    const thumbnail = document.getElementById("thumbnails");
    thumbnail.innerHTML = ""; 
    data.imges.forEach((imgUrl) => {
        const imgContainer = document.createElement("img");
        imgContainer.src = `/server/uploads/${imgUrl}`;
        imgContainer.classList.add("thumbnail");

        imgContainer.addEventListener("click", () => {
            document.getElementById("mainImg").src = imgContainer.src;
        });

        thumbnail.appendChild(imgContainer);
    });
}

document.addEventListener("DOMContentLoaded" , () => {
    const stars = document.querySelectorAll(".star");
    const rateButton = document.getElementById("rate");
    const rateContainer = document.getElementById("starRating");
    
    let selectedStarValue = 0;
    let t = 0;
    rateButton.addEventListener("click" , () => {
        t++;
        if(t%2 != 0){
            rateContainer.style.display = "flex";
        }
        else rateContainer.style.display = "none";
    })


    stars.forEach((star) => {
        star.addEventListener("mouseover", () => {
             highlightStars(star.dataset.value)
            
        })
        star.addEventListener("mouseout", () => {
          deHighlightStar(star.dataset.value);
        });
        star.addEventListener("click" , () => {
            console.log("hihhih")
            selectedStarValue = star.dataset.value
            SelectedStar()
        })
    })
    function highlightStars(value) {
        stars.forEach((star) => {
            if(star.dataset.value <= value){
              star.classList.add("hover");
            }
        })
    }

    function deHighlightStar(value){
        stars.forEach((star) => {
            if(star.dataset.value <= value){
                star.classList.remove("hover");
            }
        })
    }
    function SelectedStar() {
        stars.forEach((star) => {
            star.classList.remove("selected")
            if(star.dataset.value <= selectedStarValue) star.classList.add("selected")
        })
    }
})