


function footer(){
    return `<footer class="footer">
    <div class="footer-container">
        <div class="footer-column logo-column">
            <img src="../assests/icons/logo.svg" width="60" alt="Logo">
            <p>Your trusted marketplace for premium products. Find the best deals here!</p>
        </div>
        
        <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Help</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Disclaimer</a>
        </div>

        <div class="footer-column">
            <h4>Contact</h4>
            <p>Phone: 0550673206</p>
            <p>Email: example@example.com</p>
            <p>Address: Tiaret, Algeria</p>
        </div>

        <div class="footer-column">
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com/BrahimAli" target="_blank">Facebook</a>
            <a href="https://www.instagram.com/BrahimAli" target="_blank">Instagram</a>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2025 All rights reserved</p>
    </div>
</footer>
`;
}


document.addEventListener('DOMContentLoaded' , () => {
    document.getElementById("footer").innerHTML = footer();

})