

const UserOptions = document.getElementById("role");
const SellerSection = document.getElementById("seller-section")
const UserName = document.getElementById("name");

const Switch = document.getElementById("switch")
const RegisterButton = document.getElementById("register-button")



let IsSignUp = true;



Switch.addEventListener("click" , () => {
    IsSignUp = !IsSignUp
    if(!IsSignUp){
        Switch.innerText = "you dont have an account"
        RegisterButton.innerText = "Log In"
        UserName.classList.add("hidden");
        UserOptions.classList.add("hidden");
        SellerSection.classList.add("hidden");
    }
    else{
        Switch.innerText = "you  have an account";
        RegisterButton.innerText = "Sign Up"
        UserName.classList.remove("hidden");
        UserOptions.classList.remove("hidden");
        SellerSection.classList.remove("hidden");
    }
})


UserOptions.addEventListener('change' , () => {
    if(UserOptions.value == "seller"){
        SellerSection.classList.add("active")
    }
    else {SellerSection.classList.remove("active")}
})