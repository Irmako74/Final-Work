const products = document.getElementById("products");
const popup_container = document.querySelector('.popup-container')
const categories = [
  { "id": 1, "name": "Dumplings", "image": "https://englishlib.org/dictionary/img/wlibrary/p/60281165e19a76.67613270.jpg" },
  { "id": 2, "name": "Electronics", "image": "https://api.lorem.space/image/watch?w=640&h=480&r=7597" },
  { "id": 3, "name": "Furniture", "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=1801" },
  { "id": 4, "name": "Shoes", "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=2838" },
  { "id": 5, "name": "Others", "image": "https://api.lorem.space/image?w=640&h=480&r=8949" }
]

function add_click_effect_to_card (product) {
  product.forEach(product => {
    product.addEventListener('click', () => show_popup(product))
  });
}


const navBottomEl = document.getElementById(`navBottom`);

var selectedCategory = []
setCategory();
function setCategory() {
  navBottomEl.innerHTML = ``;
  categories.forEach(category => {
    const t = document.createElement('div');
    t.classList.add('menuItem');
    t.id = category.id;
    t.innerText = category.name;
    t.addEventListener('click', () => {
        if(selectedCategory.length ==0) {
          selectedCategory.push(category.id);
        } else {
          if(selectedCategory.includes(category.id)){
            selectedCategory.forEach((id, idx) => {
              if(id == category.id){
                selectedCategory.splice(idx, 1);
              }
            }) 
          }else{
            selectedCategory.push(category.id);
          }
        }
        console.log(selectedCategory)
        getProducts('https://api.escuelajs.co/api/v1/products' + '&categories='+encodeURI
        (selectedCategory.join(',')));
        
    })
    navBottomEl.append(t);
  })
}

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
                class="add-to-cart">Quick View</ion-icon></a>
            </div>
            </div>
        </div>
        `;
    }
  }
  fetchProducts('https://api.escuelajs.co/api/v1/products');
});

//popup
async function get_product_by_id (id) {
  const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  const respData = await resp.json()
  return respData.results
}

function show_popup () {
  popup_container.classList.add('show-popup')
}
