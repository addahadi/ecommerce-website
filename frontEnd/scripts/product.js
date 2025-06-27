import { mysqlDatetimeToNormal } from "../utils/util.js"
import productCard from "./productCard.js"
import { showToast } from "/utils/util.js"



let result
let added

document.addEventListener("DOMContentLoaded" , async () => {

    await getProduct()
    await fetchWishList();
    await getRecommendedList();
    toggleToWishList()
})


async function getProduct(){
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
            result = await response.json()
            const {data} = result
            console.log(data)
            showProductInfo(data)
        }
    }
    catch(err) {
        console.log(err)
    }
}


function showProductInfo(data){
    document.getElementById("mainImg").src = `/server/uploads/${data.imges[0]}`
    document.getElementById("title").textContent = data.title
    document.getElementById("description").textContent = data.descr; 
    document.getElementById("price").textContent = data.price + "$";
    document.getElementById("date").textContent = mysqlDatetimeToNormal(data.created_at);
    document.getElementById("category").textContent = data.category;
    document.getElementById("region").textContent = data.region;
    document.getElementById("regionn").textContent = data.region
    document.getElementById("phone").textContent = data.phone_number;



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











async function fetchWishList(){
  const path = window.location.pathname;
  const parts = path.split("/");
  const productId = parts[parts.length - 1];
  const WishButton = document.getElementById("addToWish");





  try{
    const respence = await fetch("http://localhost:8090/wishlists/get" , {
      method : "GET",
      credentials : "include"
    });
    if(respence.ok){
      const result = await respence.json()
      console.log();
      if (!result.data.includes(parseInt(productId))) {
        
        WishButton.innerText = "🤍 Wish List";
        added = false;
      } else {
        WishButton.innerText = "❤️ Added";
        added = true;
      }
    }
  }
  catch(err){
    console.log(err)
  }
}




async function getRecommendedList()  {
  const path = window.location.pathname;
  const parts = path.split("/");
  const productId = parts[parts.length - 1];
  try {
    const response = await fetch(
      `http://localhost:8090/products/getrecommendedlist/${productId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if(response.ok){
      const result = await response.json()
      result.data.map((product) => {
        document.getElementById("reclist-container").appendChild(productCard(product));
      })
      console.log(result)
    }
  }
  catch(err){
    console.log(err)
  }
}



function toggleToWishList(){
    const WishButton = document.getElementById("addToWish");
    const toast = document.getElementById("toast")
    
    const path = window.location.pathname;
    const parts = path.split("/");
    const productId = parts[parts.length - 1];
  
    WishButton.addEventListener("click", async () => {
        try {
          
          const url = added ? `http://localhost:8090/wishlists/delWishlist`
            : "http://localhost:8090/wishlists/addWishlist";

        
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
          });

          if (response.ok) {
            const result = await response.json();
              showToast(
                result.status
                  ? "Added to wish-list ✔️"
                  : "Removed from wish-list ❌"
               , toast);
              
               if (result.status) {
                 WishButton.innerText = "❤️ Added";
                 added = true;
               } else {
                 WishButton.innerText = "🤍 Wish List";
                 added = false;
               }
          }

        } catch (err) {
          console.log(err);
        }
      }
    );
}






const modal = document.getElementById("messageModal");
const closeModal = document.querySelector(".modal .close");
const messageBtn = document.getElementById("msg-btn");
const messageForm = document.getElementById("messageForm");

messageBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});


messageForm.addEventListener("submit" , async (event) => {
  event.preventDefault();
  if(result){

    const {userId} = result.data
    sendMessage(userId)
  }
})




async function sendMessage(seller_id){
  console.log(seller_id)
  const toast = document.getElementById("toast");
  const Name = document.getElementById("name")
  const Whatsapp = document.getElementById("whatsapp");
  const message = document.getElementById("message");
  const path = window.location.pathname;
  const parts = path.split("/");
  const productId = parts[parts.length - 1];
  const body = 'Client ' + Name.value.trim() + " sent you a message . WhatsApp: " + Whatsapp.value.trim() + " message :" + message.value.trim()
  
  const requestBody =  {
    body,
    productId : productId ? productId : '',
    title : "New message from client",
    seller_id : seller_id
  }

  try {
    const response = await fetch("http://localhost:8090/products/message", {
      method : "POST", 
      headers : {
        "Content-Type": "application/json",

      },
      body : JSON.stringify(requestBody)
    }) 
    if(response.ok){
      const result = await  response.json()
      modal.style.display = "none";
      setTimeout(() => {
        showToast("message was sent ✔️" , toast);

      },500)
    }
  }
  catch(err){
    console.log(err)
  }
}