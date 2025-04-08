
document.addEventListener("DOMContentLoaded" , () => {
    document
      .getElementById("addProjectForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
      console.log("Form submit triggered");

        const title = document.getElementById("title").value.trim();
        const desc = document.getElementById("description").value.trim();
        const price = document.getElementById("price").value.trim();
        const stock = document.getElementById("stock").value.trim();
        const category = document.getElementById("category").value.trim();
        const region = document.getElementById("region").value.trim();
        const imges = document.getElementById("images");
    
        const formData = new FormData();
    
        if (imges.files.length > 0) {
          for (let i = 0; i < imges.files.length; i++) {
            formData.append("images", imges.files[i]);
          }
        }
      console.log("FormData built, about to fetch...");

    
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("region", region);

        
        try {
          const response = await fetch("http://localhost:8090/product/add", {
            method: "POST",

            credentials: "include",
            body: formData,
          });
    
          if (response.ok) {
             window.location.href = "main.html"
          }

        } catch (err) {
          console.error(err);
        }
      });
})
