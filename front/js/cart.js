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
  quantity.innerHTML = "Qté : ";

  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.className = "itemQuantity";
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", cart.quantity)
  input.addEventListener("change", changeQuantity);

  let contentDelete = document.createElement("div");
  contentDelete.className = "cart__item__content__settings__delete";

  let deleteItem = document.createElement("p");
  deleteItem.className = "deleteItem";
  deleteItem.innerHTML = "Supprimer"
  deleteItem.addEventListener("click", removeFromCart);

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
function removeFromCart(e){
  console.log(e.target);
    let cart = JSON.parse(localStorage.getItem("cart"));
    let element = e.target;
    let cartItem = element.closest(".cart__item");
    console.log(cartItem);
    let id = cartItem.dataset.id;
    let color = cartItem.dataset.color;
    let newCart = cart.filter(el => el.id != id || el.color != color);
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
}

// Modification de la quantité 
function changeQuantity(e){
  console.log(e.target);
  let cart = JSON.parse(localStorage.getItem("cart")); 
  const newCart = [...cart];
  const element = e.target;
  const cartItem = element.closest(".cart__item");
  const id = cartItem.dataset.id;
  const color = cartItem.dataset.color;  
  const foundItem = cart.find(el => el.id == id && el.color == color);
  const index = cart.indexOf(foundItem);
  newCart[index].quantity = parseInt(e.target.value);
  if (foundItem != undefined) {
    localStorage.setItem("cart", JSON.stringify(newCart));
  } 
  //  Penser à modififier le prix total en conséquence
}
let totalQuantity = document.getElementById("totalQuantity").innerHTML = getNumberProduct();
console.log(totalQuantity);

// Obtention du nombre d'articles
function getNumberProduct(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let number = 0;
  for (let product of cart){
    number += parseInt(product.quantity);
    console.log(product.quantity);
    console.log(number);
    console.log(typeof product.quantity);
  }
  return number;
}



/*
// Obtention du prix total
function getTotalPrice(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  console.log(total);
  for (let product of cart){
    total += product.quantity * product.price;
    console.log(product.price);
  }
  return total;
}

let totalPrice = document.getElementById("totalPrice").innerHTML = getTotalPrice();
*/