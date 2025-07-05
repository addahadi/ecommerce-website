 function validateSignUpForm(name , email , password , role) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    alert("Name is required!");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return false;
  }

  if (role === "") {
    alert("Please select a role!");
    return false;
  }

  return true;
}

 function validateLoginForm(email , password){
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return false;
  }
    return true;

}




 function showToast(msg , toast) {
  toast.textContent = msg;
  toast.hidden = false;
  setTimeout(() => (toast.hidden = true), 1800);
}


 function mysqlDatetimeToNormal(mysqlDatetime) {
  const date = new Date(mysqlDatetime);
  
  if (isNaN(date.getTime())) {
    return "Invalid datetime format!";
  }
  
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  };
  
  return date.toLocaleString("en-US", options);
}

window.showToast = showToast
window.mysqlDatetimeToNormal = mysqlDatetimeToNormal
window.validateLoginForm = validateLoginForm
window.validateSignUpForm = validateSignUpForm