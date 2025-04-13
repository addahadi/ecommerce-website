


function footer(){
    return `<footer class="footer">
        <div class="logo"> 
            <img src="../assests/icons/logo.svg"  width="50">
        </div>
        <div class="contact">
            <p>Phone: 0550673206</p>
        </div>
        <div class="social">
            <a href="https://www.facebook.com/BrahimAli" target="_blank">Facebook</a>
            <a href="https://www.instagram.com/BrahimAli" target="_blank">Instagram</a>
        </div>
        <div class="links">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Help</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Disclaimer</a>
        </div>
        <p>&copy; 2025 All rights reserved</p>
    </footer>`
}


document.addEventListener('DOMContentLoaded' , () => {
    document.getElementById("footer").innerHTML = footer();

})