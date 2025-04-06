import {validateLoginForm} from "../utils/util.js"






document.addEventListener("DOMContentLoaded" , async () => {
  try {
    const response = await fetch("http://localhost:8090/auth/me" , {
      method:"GET",   
      credentials:"include"
    })
    const result = await response.json()
    if(result){
      document.getElementById("name").textContent = result.username;
      document.getElementById("email").textContent = result.email;
      document.getElementById("phone").textContent = result.pssword
    }
  }
  catch(err){
    console.log(err)
  }
})











function showEditPersonalInfo() {
  document.getElementById("personal-info-view").style.display = "none";
  document.getElementById("personal-info-edit").style.display = "block";

  // Pre-fill input fields
  document.getElementById("edit-name").value = document.getElementById("name").textContent;
  document.getElementById("edit-email").value = document.getElementById("email").textContent;
  document.getElementById("edit-phone").value = document.getElementById("phone").textContent;
}

window.showEditPersonalInfo = showEditPersonalInfo;


async function savePersonalInfo() {

  const name = document.getElementById("edit-name");
  const email = document.getElementById("edit-email");
  const password = document.getElementById("edit-phone");



  if(!validateLoginForm(email.value , password.value)){
    return 
  }

  if(name.value.length < 5){
    alert("the name is short")
    return
  }

  try {
     const requestBody = {
      username : name.value.trim() ,
      email : email.value.trim(),
      password  : password.value.trim()
     }
     const response = await fetch("http://localhost:8090/auth/update", {
       method: "POST",
       credentials: "include",
       headers: {
         "Content-type": "application/json",
       },
       body: JSON.stringify(requestBody),
     });

     const result = await response.json()
     console.log(result)
     if(result.ok){
      document.getElementById("name").textContent = name.value;
      document.getElementById("email").textContent = email.value;
      document.getElementById("phone").textContent = phone.value;

      document.getElementById("personal-info-edit").style.display = "none";
      document.getElementById("personal-info-view").style.display = "block";
      
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
