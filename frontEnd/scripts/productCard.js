
function productCard(product) {
  const card = document.createElement("div");
  card.className = "products";

  card.innerHTML = `
      <div class="productsImgContainer">
          <img src="http://localhost:8090/uploads/${product.img_url}" alt="pc" width="200px" class="productImg">
      </div>
      <div class="text-container">
        <span class="productTitle">${product.title}</span>
        <div class="under-text">
          <div class="productPrice">${product.price}$</div>
          <div class="card-rating">
                <span class="rated" data-value="1">&#9733;</span>
                <span class="rated" data-value="2">&#9733;</span>
                <span class="rated" data-value="3">&#9733;</span>
                <span class="rated" data-value="4">&#9733;</span>
                <span class="rated" data-value="5">&#9733;</span>
                <span class="card-review-count"></span>
          </div>
        </div>
      </div>
    `;

  showRating(card, product);

  card.onclick = () => {
    window.location.href = `/pages/product.html?id=${product.productId}`;
  };

  return card;
}

function showRating(card, result) {
  const stars = card.querySelectorAll(".rated");
  stars.forEach((star) => {
    if (parseInt(star.dataset.value) <= result.rate) {
      star.classList.add("hover");
    }
  });

  const reviewSpan = card.querySelector(".card-review-count");
  reviewSpan.textContent = `( ${result.total} Reviews )`;
}


window.productCard = productCard