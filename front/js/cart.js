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
    priceArray.push(getTotalForProduct(product.quantity, product.price));
});
  let totalPrice = getTotalPrice(priceArray)
  document.getElementById("totalPrice").innerHTML = totalPrice;
  console.log(typeof getTotalPrice(totalPrice));
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
const nameCityRegExp = new RegExp ("[^a-z]{2,30}$"),
      addressRegExp = new RegExp ("[^[a-zA-Z0-9\s,.'-]{3,}$]"),
      emailRegExp = new RegExp ("[^a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+\.{1}[a-z]{1,10}$"); 

// Création de l'objet contenant les informations clients
const contact = {
  firstName : "firstName.value",
  lastName : "lastName.value",
  address : "address.value",
  city : "city.value",
  email : "email.value"
};
console.log(contact);

// Création du tableau contenant les id des produits du panier
const products = [];
for (let i = 0; i < cart.length; i++) {
  products.push(cart[i].id);
}
console.log(products);

// Création de l'objet contenant les infos clients et les id des produits
let sendData = {contact, products};

// Ecoute sur chaque input et création d'un data-set pour pouvoir traiter le bouton order selon qu'il y ait une erreur ou on
firstName.addEventListener("keyup", t => {
  t.test(nameCityRegExp);
  t = true ? firstNameErrorMsg = "" : firstNameErrorMsg = 'Merci de remplir le champ "Prénom" avec uniquement des caractères.';
  if (t = true) {
    firstName.setAttribute("data", "foo");
  }
});

lastName.addEventListener("keyup", t => {
  t.test(nameCityRegExp);
  t = true ? lastNameErrorMsg = "" : lastNameErrorMsg = 'Merci de remplir le champ "Nom" avec uniquement des caractères.';
  if (t = true) {
    lastName.setAttribute("data", "foo");
  }
});

address.addEventListener("keyup", t => {
  t.test(addressRegExp);
  t = true ? addressErrorMsg = "" : addressErrorMsg = 'Addresse incorrecte.';
  if (t = true) {
    address.setAttribute("data", "foo");
  }
});

city.addEventListener("keyup", t => {
  t.test(nameCityRegExp);
  t = true ? cityErrorMsg = "" : cityErrorMsg = 'Merci de remplir le champ "Ville" avec uniquement des caractères.';
  if (t = true) {
    city.setAttribute("data", "foo");
  }
 });

email.addEventListener("keyup", t => {
  t.test(emailRegExp);
  t = true ? emailErrorMsg = "" : emailErrorMsg = "L'email n'est pas valide.";
  if (t = true) {
    email.setAttribute("data", "foo");
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
  fetch("http://localhost:3000/api/products/order", options)
    .then (response => response.json())
    .then (responseJS => {
      let error = 0;
      let input = document.getElementsByTagName("input"); 
      for (let i = 0; i < input; i++) {                      // Je boucle sur tous les input
        if (input[i].getAttribute("data-foo") != true) {     // Si l'input n'est pas rempli correctement
          error += 1;                                        // J'incrémente error
        } else if (error = 0) {                              // S'il n'y a aucune erreur
          JSON.stringify(localStorage.setItem(responseJS));  // J'envoi les données au serveur
        }
      }
    })
  }
  );