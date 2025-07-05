const params = {
  category: "",
  price: "",
  sort: "",
  star: "",
  region: "",
};

const filterInfo = document.getElementById("filters-info");
const tagMap = {};

function showNoResults() {
  const exploreContainer = document.getElementById("Explore-container");

  const noResultsHTML = `
    <div class="no-results fade-in">
      <div class="no-results-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8L9 11L12 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
        </svg>
      </div>
      <h2>No results found</h2>
      <p>We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.</p>
      
      <div class="no-results-suggestions">
        <h3>Try these suggestions:</h3>
        <ul>
          <li>Check your spelling and try again</li>
          <li>Use more general keywords</li>
          <li>Remove some filters to see more results</li>
          <li>Try different categories or price ranges</li>
        </ul>
      </div>
      
      <button class="clear-filters-btn" onclick="clearAllFilters()">
        Clear All Filters
      </button>
    </div>
  `;

  exploreContainer.innerHTML = noResultsHTML;
}

function showLoading() {
  const exploreContainer = document.getElementById("Explore-container");

  const loadingHTML = `
    <div class="loading fade-in">
      <div class="loading-spinner"></div>
    </div>
  `;

  exploreContainer.innerHTML = loadingHTML;
}

function clearAllFilters() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  const searchInput = document.querySelector('.top-bar input[type="text"]');
  if (searchInput) {
    searchInput.value = "";
  }

  const sortSelect = document.getElementById("sortId");
  if (sortSelect) {
    sortSelect.value = "Most liked";
  }

  Object.keys(params).forEach((key) => {
    params[key] = "";
  });

  Object.keys(tagMap).forEach((key) => {
    tagMap[key].remove();
    delete tagMap[key];
  });

  performSearch();
}

function hasValue(p) {
  const value = params[p];
  if (typeof value === "string") {
    return value.trim() !== "";
  } else if (typeof value === "object" && value !== null) {
    return value.length > 0;
  }
  return false;
}

function activeFilter(param) {
  const currentlyHasValue = hasValue(param);
  const alreadyExists = !!tagMap[param];

  if (currentlyHasValue && !alreadyExists) {
    const span = document.createElement("span");
    span.classList.add("tag");
    span.dataset.param = param;

    span.textContent =
      {
        star: "star rating",
        price: "price range",
        region: "popular region",
        category: "category",
        sort: "sort order",
      }[param] ?? param;

    filterInfo.appendChild(span);
    tagMap[param] = span;
  }

  if (!currentlyHasValue && alreadyExists) {
    tagMap[param].remove();
    delete tagMap[param];
  }
}

async function performSearch() {
  showLoading();

  console.log(params);
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `http://localhost:8090/products/searchproduct?${query}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      const exploreContainer = document.getElementById("Explore-container");

      if (result.data && result.data.length > 0) {
        exploreContainer.innerHTML = "";
        result.data.forEach((product) => {
          exploreContainer.appendChild(window.productCard(product));
        });
      } else {
        showNoResults();
      }
    } else {
      showNoResults();
    }
  } catch (err) {
    console.log(err);
    showNoResults();
  }
}

function getCategory() {
  const radios = document.querySelectorAll("input[name=category]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        params["category"] = this.value;
      }
      activeFilter("category");
    });
  });
}

function getPrice() {
  const radios = document.querySelectorAll("input[name=price]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        params["price"] = this.value;
      }
      activeFilter("price");
    });
  });
}

function getRegion() {
  const radios = document.querySelectorAll("input[name=region]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      params["region"] = Array.from(radios)
        .filter((cb) => cb.checked)
        .map((cb) => {
          return cb.value;
        })
        .join(",");
      activeFilter("region");
    });
  });
}

function getStar() {
  const radios = document.querySelectorAll("input[name=star]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      params["star"] = Array.from(radios)
        .filter((cb) => cb.checked)
        .map((cb) => {
          return cb.value;
        })
        .join(",");
      activeFilter("star");
    });
  });
}

function getSortType() {
  const selectedSort = document.getElementById("sortId");
  selectedSort.addEventListener("change", () => {
    params["sort"] = selectedSort.value;
    activeFilter("sort");
  });
}

function initializeMobileFilters() {
  const mobileToggle = document.querySelector(".mobile-filter-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
      mobileToggle.classList.toggle("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getCategory();
  getPrice();
  getRegion();
  getStar();
  getSortType();
  activeFilter();
  initializeMobileFilters();

  document
    .getElementById("search-button")
    .addEventListener("click", performSearch);

  const searchInput = document.querySelector('.top-bar input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("tag")) {
      const param = e.target.dataset.param;

      if (param) {
        params[param] = "";

        const inputs = document.querySelectorAll(`input[name="${param}"]`);
        inputs.forEach((input) => {
          input.checked = false;
        });

        if (param === "sort") {
          const sortSelect = document.getElementById("sortId");
          if (sortSelect) {
            sortSelect.value = "Most liked";
          }
        }

        activeFilter(param);
        performSearch();
      }
    }
  });
});
