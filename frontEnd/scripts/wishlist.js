
import wishListCard from "../scripts/wishListCard.js"
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
            showWishLists(result.data)
        }
    }
    catch(err){
        console.log(err)
    }
}





function showWishLists(data){
    const template = document.getElementById("row-tpl");
    data.forEach(product => {
        const productRow = wishListCard(product)
        template.appendChild(productRow);
    });
}