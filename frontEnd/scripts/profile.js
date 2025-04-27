

const listItems = document.querySelectorAll(".sidebar li")
const sectionItems = document.querySelectorAll(" main .card")


let userData = {}


document.addEventListener("DOMContentLoaded" , async () => {
  console.log("hihihihihihihihhihihhih")
  try {
    const response = await fetch("http://localhost:8090/auth/me" , {
      method:"GET",   
      credentials:"include"
    })
    if(response.ok){
      const  result = await response.json();
      console.log(result);
      if (result) {
        userData = result;
        populateUserInfo(result);
        if(result.role == "seller"){
          document.getElementById("seller-section").style.display = "block"
        }
      }
    }
  }
  catch(err){
    console.log(err)
  }
})





function populateUserInfo (data){
  const mapping = {
    "welcom" : data.username,
    "name" : data.username,
    "email" : data.email,
    "phone" : "******",
    "store-name" : data.store_name && data.store_name,
    "store-phone" : data.phone_number && data.phone_number,
    "store-logo" : data.store_logo && data.store_logo
  }
  for(const Id in mapping){
    const element = document.getElementById(Id)
    console.log(mapping[Id])
    if(element){
      if(Id == "store-logo"){
        element.src = `../server/uploads/${mapping[Id]}`;
      }
      element.textContent = mapping[Id];
    }
  }
}


listItems.forEach((item) => {
  item.addEventListener("click" , () => {
      listItems.forEach((li) => li.classList.remove("active"));

      item.classList.add("active");    

      sectionItems.forEach((section) => section.style.display = "none");
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      
      if(targetSection){
        targetSection.style.display = "block"
      }
  })
})





function showEditPersonalInfo(sectionId , fields) {
  document.getElementById(`${sectionId}-view`).style.display = "none";
  document.getElementById(`${sectionId}-edit`).style.display = "block";

  fields.forEach((field) => {
    const spanContent = document.getElementById(field).textContent || "";
    document.getElementById(`edit-${field}`).value = spanContent;
  })
}

window.showEditPersonalInfo = showEditPersonalInfo;


async function savePersonalInfo( section ,fields , endpoints , url) {

  const formData = new FormData()
  fields.forEach((field , index) => {
    const targetInput = document.getElementById(field)
  
    if (field === "edit-store-logo"){
      formData.append("image" , targetInput.files[0])
      return 
    }

    formData.append(`${endpoints[index]}` ,targetInput.value.trim());

  })

  try {
     
     const response = await fetch(url, {
       method: "POST",
       credentials: "include",
       body: formData,
     });

     
     if(response.ok){
      document.getElementById(`${section}-edit`).style.display = "none";
      document.getElementById(`${section}-view`).style.display = "block";

    }
  }
  catch(err){
    console.log(err)
  }
}

window.savePersonalInfo = savePersonalInfo;

function cancelEdit(section) {
  document.getElementById(`${section}-edit`).style.display = "none";
  document.getElementById(`${section}-view`).style.display = "block";
}

window.cancelEdit = cancelEdit;




document.getElementById("LogOut").addEventListener("click" , async () => {
  try {
    const response = await fetch("http://localhost:8090/auth/logout", {
      method : "GET",
      credentials :"include"
    })
    
    if(response.ok){
      const result = await response.json()
      console.log(result)
      window.location.href = "/main"
    }
    
  }
  catch(err){
    console.log(err)
  }
})

