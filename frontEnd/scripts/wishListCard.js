export default function wishListCard(Product){
    const productRow = document.createElement("tr");
    productRow.innerHTML = `

            <td class="product">
                <img />
                <span class="name">${Product.title}</span>
            </td>
            <td class="price">${Product.price}</td>
            <td class="stock">${Product.stock}</td>
            <td class="actions">
                <button class="add-cart" ><a href=${Product.facebook} style="text-decoration:none; color:white">Message</a></button>
                <button class="remove">&times;</button>
            </td>
    
    `
    productRow.addEventListener("click" , () => {
        window.location.href = `/product/${Product.productId}`
    })
    return productRow
}