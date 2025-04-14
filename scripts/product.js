document.addEventListener("DOMContentLoaded" , async () => {
    try {
        const response = await fetch("http://localhost:8090/auth/status" , {
            method : "GET",
            credentials:'include'
        });
        const result = await response.json()
        if(result.loggedIn){
            document.getElementById("profile-button").style.display = "block";
            document.getElementById("Login-button").style.display = "none";
        }
    }

    catch(err) {
        console.log(err)
    }
})


document.addEventListener("DOMContentLoaded" , async () => {
    
    const path = window.location.pathname;

    const parts = path.split("/");

    const productId = parts[parts.length - 1];

    const requestBody = {
        productId
    }

    try {
        const response = await fetch("http://localhost:8090/product/get", {
            method : "POST",
            body : JSON.stringify(requestBody)
        })
        const result = await response.json()
        console.log(result)
    }
    catch(err) {
        console.log(err)
    }
})