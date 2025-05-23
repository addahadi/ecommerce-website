export function validateSignUpForm(name , email , password , role) {
  // Regex for validating email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate Name
  if (name === "") {
    alert("Name is required!");
    return false;
  }

  // Validate Email
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  // Validate Password
  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return false;
  }

  // Validate Role
  if (role === "") {
    alert("Please select a role!");
    return false;
  }

  return true;
}

export function validateLoginForm(email , password){
  
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




export function showToast(msg , toast) {
  toast.textContent = msg;
  toast.hidden = false;
  setTimeout(() => (toast.hidden = true), 1800);
}


export function mysqlDatetimeToNormal(mysqlDatetime) {
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


