const categories = [
  { "id": 1, "name": "Dumplings", "image": "https://englishlib.org/dictionary/img/wlibrary/p/60281165e19a76.67613270.jpg" },
  { "id": 2, "name": "Electronics", "image": "https://api.lorem.space/image/watch?w=640&h=480&r=7597" },
  { "id": 3, "name": "Furniture", "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=1801" },
  { "id": 4, "name": "Shoes", "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=2838" },
  { "id": 5, "name": "Others", "image": "https://api.lorem.space/image?w=640&h=480&r=8949" }
]

// const navBottomEl = document.getElementById(`navBottom`);

document.addEventListener('DOMContentLoaded', function () {
  let products = document.querySelector(".products");
  
    async function fetchProducts(url) {
    let data = await fetch(url);
    let response = await data.json();


    for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        products.innerHTML += `
        <div class="product">
            <img src="${response[i].images[1]}" alt="${response[i].category.name}" 
            class="product-img">
            <div class="product-content"> 
            <h2 class="product-title">${title.length > 18 ? title.substring(0, 18).concat('...'):title}</h2>
            <h4 class="product-category">${response[i].category.name}</h4>
            
            <div class="product-price-container">
                <h3 class="product-price">$${response[i].price}</h3>
                <a href="popup.html" data-productId="${response[i].id}" 
                class="add-to-cart">Quick View</a>
            </div>
            </div>
        </div>
        `;
  

    }

  }
  fetchProducts('https://api.escuelajs.co/api/v1/products?limit=20&offset=5');
});

// get data from https://api.escuelajs.co/api/v1/categories?limit=4
// and render it in the navBottom element
let navBottom = document.getElementById('navBottom');
async function fetchProducts(url) {
  let data = await fetch(url);
  let response = await data.json();
  for (let i = 0; i < response.length; i++) {
    let name = response[i].name;
    navBottom.innerHTML += `
      <h3 class="menuItem">${name}</h3>
    `;
  }
  // on navBottom click, filter products by category
  navBottom.addEventListener('click', (e) => {
    let products = document.querySelectorAll('.product');
    let category = e.target.innerHTML;
    products.forEach((product) => {
      let productCategory = product.querySelector('.product-category').innerHTML;
      if (productCategory !== category) {
        product.style.display = 'none';
      } else {
        product.style.display = 'flex';
      }
    });
  }
  );
}
fetchProducts('https://api.escuelajs.co/api/v1/categories?limit=4');

