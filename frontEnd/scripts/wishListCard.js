function wishListCard(Product){
    const productRow = document.createElement("div");
    productRow.classList.add("product_container")
    productRow.innerHTML = `

            <div class="product">
                <span class="name">${Product.title}</span>
            </div>
            <div style="display:flex; gap:10px;">
                <div class="price">${Product.price}$</div>
                <div class="stock">${Product.stock}</div>
            </div>
            <div class="actions">
                <button class="add-cart" ><a href=${Product.facebook} style="text-decoration:none; color:white">Message</a></button>
                <button class="remove">&times;</button>
            </td>
    
    `
    productRow.addEventListener("click" , () => {
        window.location.href = `/product/${Product.productId}`
    })
    return productRow
}


window.wishListCard = wishListCard