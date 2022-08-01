// Récupération du localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// Récupération des datas API
const getData = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const product = await response.json();
  let priceArray = [];
  cart.forEach(item => {
    const foundItem = product.find(p => p._id == item.id)
    displayProduct(item, foundItem)
    console.log(foundItem);
    priceArray.push(getTotalForProduct(item.quantity, foundItem.price));
});
  let totalPrice = getTotalPrice(priceArray)
  document.getElementById("totalPrice").innerHTML = totalPrice;
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
    location.reload();
  } 
}

// Obtention du nombre d'articles
function getNumberProduct(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let number = 0;
  for (let product of cart){
    number += parseInt(product.quantity);
  }
  return number;
}

let totalQuantity = document.getElementById("totalQuantity").innerHTML = getNumberProduct();

// Obtention du prix total de chaque article
function getTotalForProduct(quantity, price) {
  return quantity * price; 
}

// Obtention du prix total
function getTotalPrice(priceArray){
  let total = 0;
  priceArray.forEach (p => {
    total += p;
  }) 
  return total;
}


  /// Gestion du formulaire
// Récupération des éléments du DOM
const firstName = document.getElementById("firstName"),
      firstNameErrorMsg = document.getElementById("firstNameErrorMsg"),
      lastName = document.getElementById("lastName"),
      lastNameErrorMsg = document.getElementById("lastNameErrorMsg"),
      address = document.getElementById("address"),
      addressErrorMsg = document.getElementById("addressErrorMsg"),
      city = document.getElementById("city"),
      cityErrorMsg = document.getElementById("cityErrorMsg"),
      email = document.getElementById("email"),
      emailErrorMsg = document.getElementById("emailErrorMsg"),
      order = document.getElementById("order");

// Création des regex
const nameCityRegExp = /[a-zA-Z^0-9\s]{3,32}/,
      addressRegExp =  /[a-zA-Z0-9\s]{8,32}/,
      emailRegExp =  /[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+\.{1}[a-z]{1,10}/; 

// Création de l'objet contenant les informations clients
const contact = {
  firstName : firstName.value,
  lastName : lastName.value,
  address : address.value,
  city : city.value,
  email : email.value
};

// Création du tableau contenant les id des produits du panier
const products = [];
for (let i = 0; i < cart.length; i++) {
  products.push(cart[i].id);
}

// Création de l'objet contenant les infos clients et les id des produits
let sendData = {contact, products};

// Ecoute sur chaque input et création d'un data-set pour pouvoir traiter le bouton order selon qu'il y ait une erreur ou on
firstName.addEventListener("keyup", t => {
  t = nameCityRegExp.test(firstName.value);
  firstNameErrorMsg.innerHTML = t ? "" : 'Merci de remplir le champ "Prénom" avec uniquement des caractères.';
  if (t) {
    firstName.setAttribute("data-foo", "true");
  } else {
    firstName.removeAttribute("data-foo");
  }
});

lastName.addEventListener("keyup", t => {
  t = nameCityRegExp.test(lastName.value);
  // t = true ? lastNameErrorMsg = "" : lastNameErrorMsg = 'Merci de remplir le champ "Nom" avec uniquement des caractères.';
  lastNameErrorMsg.innerHTML = t ? "" : 'Merci de remplir le champ "Nom" avec uniquement des caractères.';
  if (t) {
    lastName.setAttribute("data-foo", "true");
  } else {
    lastName.removeAttribute("data-foo");
  }
});

address.addEventListener("keyup", t => {
  t = addressRegExp.test(address.value);
  addressErrorMsg.innerHTML = t ? "" : 'Addresse incorrecte.';
  if (t) {
    address.setAttribute("data-foo", "true");
  } else {
    address.removeAttribute("data-foo");
  }
});

city.addEventListener("keyup", t => {
  t = nameCityRegExp.test(city.value);
  cityErrorMsg.innerHTML = t ? "" : 'Merci de remplir le champ "Ville" avec uniquement des caractères.';
  if (t) {
    city.setAttribute("data-foo", "true");
  } else {
    city.removeAttribute("data-foo");
  }
 });

email.addEventListener("keyup", t => {
  t = emailRegExp.test(email.value);
  emailErrorMsg.innerHTML = t ? "" : "L'email n'est pas valide.";
  if (t) {
    email.setAttribute("data-foo", "true");
  } else {
    email.removeAttribute("data-foo");
  }
})

// Méthode POST pour l'envoi des données
const options = {
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData)
  };

// Envoi des données de la commande à l'API
order.addEventListener("click", e => {
  e.preventDefault();
  let error = 0;
  let input = document.getElementsByTagName("input"); 
  for (let i = 0; i < input.length - 2; i++) {                     // Je boucle sur tous les input
    if (input[i].getAttribute("data-foo") != true) {               // Si l'input n'est pas rempli correctement
      console.log(error);                                          // J'incrémente error
      error += 1;      
    } 
    if (error == 0) {                                              // S'il n'y a aucune erreur
      fetch("http://localhost:3000/api/products/order", options)
      .then (response => response.json())
      .then (responseJS => {
        JSON.stringify(localStorage.setItem(responseJS));          // J'envoi les données au serveur
      })
    }
  }
});
