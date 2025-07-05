

document.addEventListener('DOMContentLoaded', async function() {
    await getSellerInfo();
    await getSellerProducts();
})



async function getSellerInfo() {
    const params = new URLSearchParams(window.location.search);
    const sellerId = params.get("id");
    try {
        const response = await fetch(`http://localhost:8090/seller/getinfo/${sellerId}` ,{
            method: 'GET',
            credentials: 'include'
        });
        if(response.ok) {
            const result = await response.json();
            const {data} = result
            setProfileInfo(data);

        }
    }
    catch(err){
        console.error('Error fetching seller info:', err);
    }
}

async function getSellerProducts(){
    const params = new URLSearchParams(window.location.search);
    const sellerId = params.get("id");
    try {
        const response = await fetch(`http://localhost:8090/seller/getproducts/${sellerId}` ,{
            method: 'GET',
            credentials: 'include'
        });
        if(response.ok) {
            const result = await response.json();
            const {data} = result;
            const productContainer = document.querySelector(
              ".profile-product-card-container"
            );
            data.forEach(product => {
                const productCard = window.profileProductCard(product);
                productContainer.appendChild(productCard);
            });
            console.log(data);
        }
    }
    catch(err){
        console.error('Error fetching seller products:', err);
    }
}


function setProfileInfo(data) {
    console.log(data)
    document.getElementById("profile-img-element").src =
      `../../server/uploads/${data.store_logo}` || "default-logo.png";
    document.getElementById("shop-name").textContent = data.store_name || "Store Name";
    document.getElementById("shop-owner").textContent = data.username || "Shop Owner";
    document.getElementById("phone-number").textContent = data.phone_number || "Phone Number";
}