import {validateSignUpForm , validateLoginForm} from "../utils/util.js";

const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const form = document.getElementById("form");

const SellerSection = document.getElementById("seller-section")
const textSwitch = document.getElementById("switch")

const storeName = document.getElementById("store-name");
const storeLogo = document.getElementById("store-logo");
const phoneNumber = document.getElementById("phone");


const RegisterButton = document.getElementById("register-button")



let IsSignUp = true;



textSwitch.addEventListener("click" , () => {
    IsSignUp = !IsSignUp
    if(!IsSignUp){
        textSwitch.innerText = "you dont have an account"
        RegisterButton.innerText = "Log In"
        nameInput.classList.add("hidden");
        roleInput.classList.add("hidden");
        SellerSection.classList.add("hidden");
    }
    else{
        textSwitch.innerText = "you have an account";
        RegisterButton.innerText = "Sign Up"
        nameInput.classList.remove("hidden");
        roleInput.classList.remove("hidden");
        SellerSection.classList.remove("hidden");
    }
})


roleInput.addEventListener('change' , () => {
    if(roleInput.value == "seller"){
        SellerSection.classList.add("active")
    }
    else {SellerSection.classList.remove("active")}
})








form.addEventListener('submit' , async (e) => {
    e.preventDefault()
    
    if(IsSignUp){
        const username = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const role = roleInput.value.trim();
            
        if(!validateSignUpForm(username , email , password , role)){
            return;
        }
        
        
        try {
            
            const formData = new FormData()

            formData.append('username' , username)
            formData.append('email' , email)
            formData.append('password' , password)
            formData.append('role' , role)
            
            if(role === "seller"){
                console.log(storeLogo.files[0])
                formData.append("store_name" , storeName.value.trim())
                formData.append("store_logo", storeLogo.files[0]);
                formData.append("phone", phoneNumber.value.trim());
            }
            if (role === "seller" && phoneNumber < 6) {
              alert("Phone number must be at least 6 digits long.");
              return;
            }
    
            const response = await fetch("http://localhost:8090/auth/signup", {
              method: "POST",
              body: formData,
            });
            if (response.ok) {
              IsSignUp = false;
            }

            } catch (error) {
                console.error('Error:', error);
            }
        }
        
        
        else {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            const requestBody = {
                email,
                password
            }
            
            if(!validateLoginForm(email , password)){
                return;
            }

            try {
                
                const response = await fetch("http://localhost:8090/auth/login", {
                
                  method: "POST",
                
                  headers: {
                    "Content-type": "application/json",
                  },
                
                  credentials:"include",
                  body: JSON.stringify(requestBody),
                
                });
    
                const data = await response.json()
                

                if(response.ok) {
                    window.location.href = "/main"
                }
                
                else alert("login field")
            }
            catch(err){
                console.log(err)
            }
        }
    }
)