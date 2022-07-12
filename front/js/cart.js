// Récupération du localStorage
//function itemInfo(){
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
//}

//itemInfo();

// Récupération des datas API
const getData = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const product = await response.json();
  console.log(product);
  cart.forEach(item => {
    const foundItem = product.find(p => p._id == item.id)
    displayProduct(item, foundItem)
    console.log(foundItem);
});
};

getData();

// Affichage des produits {
function displayProduct(cart, product) {
  let section = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.className = "cart__item";
  article.setAttribute("data-id", cart.id);
  article.setAttribute("data-color", cart.color);

  let imgDiv = document.createElement("div");
  imgDiv.className = "cart__item__img";

  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altText);

  let content = document.createElement("div");
  content.className = "cart__item__content";

  let contentDescription = document.createElement("div");
  contentDescription.className = "cart__item__content__description";

  let contentTitle = document.createElement("h2");
  contentTitle.innerHTML = product.name;

  let contentColor = document.createElement("p");
  contentColor.innerHTML = cart.color;
  console.log(cart.color);

  let contentPrice = document.createElement("p");
  contentPrice.innerHTML = product.price;

  let contentSettings = document.createElement("div");
  contentSettings.className = "cart__item__content__settings";

  let contentQuantity = document.createElement("div");
  contentQuantity.className = "cart__item__content__settings__quantity";

  let quantity = document.createElement("p");
  quantity.innerHTML = cart.quantity;

  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.className = "itemQuantity";
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");

  let contentDelete = document.createElement("div");
  contentDelete.className = "cart__item__content__settings__delete";

  let deleteItem = document.createElement("div");
  deleteItem.className = "deleteItem";

  section.appendChild(article);
  article.appendChild(imgDiv);
  imgDiv.appendChild(img);
  article.appendChild(content);
  content.appendChild(contentDescription);
  contentDescription.appendChild(contentTitle);
  contentDescription.appendChild(contentColor);
  contentDescription.appendChild(contentPrice);
  content.appendChild(contentSettings);
  contentSettings.appendChild(contentQuantity);
  contentQuantity.appendChild(quantity);
  contentQuantity.appendChild(input);
  contentSettings.appendChild(contentDelete);
  contentDelete.appendChild(deleteItem);
}


/*
// Suppression d'article 
function removeFromCart(item){
    let productStorage = localStorage.getItem("cart");
    productStorage = productStorage.filter(el => el.id != item.idProduct);
    localStorage.setItem("cart", JSON.stringify(productStorage));
}

// Modification de la quantité 
function changeQuantity(product, quantity){
    let productStorage = localStorage.getItem("cart");
    let foundItem = cart.find(el => el.cartId == idProduct && el.cartColor == cartColor.value);
    if (foundItem != undefined) {
      foundItem.cartQuantity = cartQuantity.value;
      if (foundItem.cartQuantity <= O){
          removeFromCart(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(productStorage));
}

// Obtention du nombre d'articles
function getNumberProduct(){
    let productStorage = localStorage.getItem("cart");
    let number = 0;
    for (let )
    return 
}*/
