import productCard  from "../scripts/productCard.js";



document.addEventListener('DOMContentLoaded' , async () => {
  
  try {

    const response = await fetch("http://localhost:8090/products/getall" , {
      method : 'GET',
      credentials :"include"
    })

    if(response.ok){
      let result = await response.json()
      console.log(result)
      result.data.forEach(product => {
        document.getElementById("Explore-container").appendChild(productCard(product));
      });
    }
  }
  catch(err){
    console.log(err)
  }
})




function generateStars(rating) {
  const starContainer = document.getElementById('starRating');
  starContainer.innerHTML = ''; // clear old stars

  for (let i = 1; i <= 5; i++) {
    const starIcon = document.createElement('i');
    starIcon.className = i <= rating ? 'fas fa-star' : 'far fa-star';
    starContainer.appendChild(starIcon);
  }
}

