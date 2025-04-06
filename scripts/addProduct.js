

document.getElementById("addProjectForm").addEventListener("submit" , (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value.trim();
    const stock = document.getElementById("stock").value.trim();
    const category = document.getElementById("category").value.trim();
    const region = document.getElementById("reion").value.trim()
    const imges = document.getElementById("images")

    const formData = new FormData()

    for(const files of imges.files){
        formData.append("images" , files);
    }
    

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("region", region);


    
});