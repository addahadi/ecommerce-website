function createNavbar() {
  return `
    <header class="navbar_container">
        <div class="website-info">
            <ul class="info-list">
                <li>
                    <span>About Us</span>
                </li>
                <li>
                    <span>Contact Us</span>
                </li>
            </ul>
        </div>
        <nav class="navbar">
            <a href="/main" class="logo">
                <img  src="/assests/icons/logo.svg" width="40px"  />
                <h2>Exclusive</h2>
            </a>

            <ul class="list">
                <li>
                    <div class="search-bar">
                    <input placeholder="What are you looking for" type="text" />
                    <button class="search">
                        <img src="/assests/icons/search.svg" alt="search"  />
                    </button>
                    </div>
                </li>
                <li>
                    <div style="position: relative; cursor: pointer; display:none" id="notification-button">
                        <img src="/assests/icons/bell.svg" width="24" />
                        <div id="notificationCount" 
                            style="position: absolute; top: -5px; right: -5px; background: red; color: white; font-size: 12px; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;">
                            0
                        </div>
                    </div>
                </li>
                <li>
                    <a href="/register" id="Login-button">
                        Login/Sign-up
                    </a>
                    <a href="/profile" id="profile-button">
                        <img src="/assests/icons/user.svg" alt="user" width="17px"/>
                    </a>
                </li>
                <li>
                    <div  id="add-product-button" style="display:none">
                        <img src="/assests/icons/add.svg" width="27px"/>
                    </div>
                </li>
                <li>
                    <a href="/wishlist">
                        <img src="/assests/icons/cart.svg" alt="cart" width="22px"/>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("navbar").innerHTML = createNavbar();
});
