import productCard from "./productCard.js";

const params = {
  category : '',
  price : '',
  sort : '',
  star: '',
  region : '',
}
const filterInfo = document.getElementById("filters-info");

document.addEventListener("DOMContentLoaded" , () => {
  getCategory()
  getPrice()
  getRegion()
  getStar()
  getSortType()
  activeFilter()


  document.getElementById("search-button").addEventListener("click" , async () => { 
    console.log(params)
    const query = new URLSearchParams(params).toString();
    try{
      const response = await fetch(`http://localhost:8090/products/searchproduct?${query}`, {
        method: "GET",
        credentials: "include",
      });
      if(response.ok){
        const result = await response.json()
        document.getElementById("Explore-container").innerHTML = ''
        result.data.forEach((product) => {
          document.getElementById("Explore-container").appendChild(productCard(product));
        })
      }
    }
    catch(err){console.log(err)}
  })

})



function getCategory(){
  const radios = document.querySelectorAll("input[name=category]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        params["category"] = this.value
      }
      activeFilter("category")
    });
  });
}


function getPrice(){
  const radios = document.querySelectorAll("input[name=price]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        params["price"] = this.value;
      }
      activeFilter("price")
    });
  });
}


function getRegion(){
  const radios = document.querySelectorAll("input[name=region]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
        params["region"] = Array.from(radios).filter(cb => cb.checked).map((cb) => {
          return cb.value;
        }).join(",")
        activeFilter("region")
    });
  });
}

function getStar(){
  const radios = document.querySelectorAll("input[name=star]");
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
        params["star"] = Array.from(radios).filter(cb => cb.checked).map((cb) => {
          return cb.value;
        }).join(",")
        activeFilter("star")
    });
  });
}



function getSortType(){
  const selectedSort = document.getElementById("sortId")
  selectedSort.addEventListener("change" , () => {
    params["sort"] = selectedSort.value
    activeFilter("sort")
  })
}


const tagMap = {};        

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
  const alreadyExists    = !!tagMap[param];

  if (currentlyHasValue && !alreadyExists) {
    const span = document.createElement('span');
    span.classList.add('tag');
    span.dataset.param = param;     
    span.textContent   = {
      star     : 'star rating',
      price    : 'price range',
      region   : 'popular region',
      category : 'category',
    }[param] ?? param;              
    filterInfo.appendChild(span);
    tagMap[param] = span;           
  }

  
  if (!currentlyHasValue && alreadyExists) {
    tagMap[param].remove();         
    delete tagMap[param];           
  }
}
