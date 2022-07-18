// Récupération du localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// Récupération des datas API
const getData = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const product = await response.json();
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
  img.setAttribute("alt", product.altTxt);

  let content = document.createElement("div");
  content.className = "cart__item__content";

  let contentDescription = document.createElement("div");
  contentDescription.className = "cart__item__content__description";

  let contentTitle = document.createElement("h2");
  contentTitle.innerHTML = product.name;

  let contentColor = document.createElement("p");
  contentColor.innerHTML = cart.color;

  let contentPrice = document.createElement("p");
  contentPrice.innerHTML = product.price + " €";

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

  let deleteItem = document.createElement("p");
  deleteItem.className = "deleteItem";
  deleteItem.innerHTML = "Supprimer"

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

// Suppression d'article 
function removeFromCart(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    const element = document.querySelector("cart__items");
    const dataId = element.closest("cart__item");
    console.log(dataId);
    const id = dataId.dataset.id;
    const color = dataId.dataset.color;
    let newCart = cart.filter(el => el.id != id || el.color != color);
    localStorage.setItem("cart", JSON.stringify(newCart));
}

removeFromCart();

document.querySelector("deleteItem").addEventListener("click", removeFromCart);


// Modification de la quantité 
function changeQuantity(product, quantity){
    let cart = JSON.parse(localStorage.getItem("cart"));    
    let foundItem = cart.find(el => el.cartId == idProduct && el.cartColor == cartColor.value);
    if (foundItem != undefined) {
      foundItem.cartQuantity = cartQuantity.value;
      if (foundItem.cartQuantity <= O){
          removeFromCart(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(productStorage));
}

const input = document.querySelector("itemQuantity")
input.addEventListener("change", changeQuantity);

// Obtention du nombre d'articles
function getNumberProduct(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let number = 0;
    for (let product of cart){
      number += product.quantity;
    }
    return number;
}
let totalQuantity = document.getElementById("totalQuantity").innerHTML = getNumberProduct();

// Obtention du prix total
function getTotalPrice(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  for (let product of cart){
    total =+ product.quantity * product.price;
  }
  return total;
}

let totalPrice = document.getElementById("totalPrice").innerHTML = getTotalPrice();