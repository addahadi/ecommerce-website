


export default function productCard(product){
    
    const card = document.createElement("div")
    card.className = "products"
    
    card.innerHTML = `
        <div class="productsImgContainer" >

            <img src="../server/uploads/${
              product.img_url
            }" alt="pc" width="200px"  class="productImg">

        </div>
        <strong  class="productTitle">${product.title}</strong>
        <p>
            <span class="productPrice">${product.price}$</span>
            <span class="stars" id="starRating"></span>

        </p>`;
        card.onclick = () => {
            window.location.href = `/pages/product/${product.productId}`;
        }
    return card;
}

