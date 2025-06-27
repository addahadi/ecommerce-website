

const  profileProductCard = (product) => {
    const element = document.createElement("div");
    element.classList.add("profile-product-card");
    element.innerHTML = `
        <figure class="profile-product-image">
            <img src="../../server/uploads/${product.img_url}" alt="${product.title}">
        </figure>
        <div class="profile-product-card-details">
            <h3 class="profile-product-name">${product.title}</h3>
            <p class="profile-product-description">${product.descr}</p>
            <p class="profile-product-price">$${product.price.toFixed(2)}</p>
            <p class="profile-product-date">📅 ${new Date(
                product.created_at
            ).toLocaleDateString()}</p>
        </div>   
    `;
    element.onclick = () => {
      window.location.href = `/product/${product.productId}`;
    };

    
    return element
}


window.profileProductCard = profileProductCard; 