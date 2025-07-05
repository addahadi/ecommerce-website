
document.addEventListener("DOMContentLoaded" , async () => {
    await fetchWishLists()
})



async function fetchWishLists() {
    try{
        const response = await fetch("http://localhost:8090/wishlists/getwishlists" , {
            method: "GET",
            credentials : "include",
            headers: {
                    "Content-type": "application/json",
                  },
        })
        if(response.ok){
            const result = await response.json()
            if(result.data.length == 0 ){
                document.getElementById("empty-state").style.display = "block";
            }
            else {
                showWishLists(result.data)
                document.getElementById("empty-state").style.display = "none";
            }
        }
    }
    catch(err){
        console.log(err)
    }
}





function showWishLists(data){
    const template = document.getElementById("wishlist-section");
    data.forEach(product => {
        const productRow = window.wishListCard(product)
        template.appendChild(productRow);
    });
}