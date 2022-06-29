// Récupération de l'id via les paramètres de l'URL
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

// Requête de l'API
async function productApi() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/products/" + idProduct
    );
    const responseProduct = await response.json();
    productInfo(responseProduct);
  } catch (error) {
    console.log(error.message);
  }
}

// Récupération des infos des produits
function productInfo(product) {
  let imgContainer = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  imgContainer.appendChild(productImg);

  let productTitle = document.getElementById("title");
  productTitle.innerText = product.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  let productDescription = document.getElementById("description");
  productDescription.innerText = product.description;

  let colorId = document.getElementById("colors");
  let colorArray = product.colors;
  for (let color of colorArray) {
    colorId.innerHTML += `<option value="${color}"> ${color}</option>`;
  }
}

// Appel de la fonction de requête de l'API
productApi();




/// Ajout d'articles au panier

// Aller chercher l'id du bouton et déclencher l'événement au clic
let addToCartBtn = document.getElementById("addToCart").addEventListener("click", addToCart);

// Récupération des éléments nécessaires
let cartId = idProduct;
console.log(cartId);
let cartImg = document.querySelector(".item__img");
console.log(cartImg);
let cartAlt = document.querySelector(".item__img");
console.log(cartAlt);
let cartTitle = document.querySelector("#title");
console.log(cartTitle);
let cartColor = document.querySelector("#colors");
console.log(cartColor);
let cartPrice = document.querySelector("#price");
console.log(cartPrice);
let cartQuantity = document.querySelector("#quantity");
console.log(cartQuantity);

// Stockage des valeurs des produits dans un objet
let values = {
    cartId : idProduct,
    cartImg : cartImg.src,
    cartAlt : cartAlt.alt,
    cartTitle : cartTitle.textContent,
    cartColor : cartColor.value,
    cartPrice : cartPrice.textContent,
    cartQuantity : cartQuantity.value,
};
console.log(values);

// Stockage dans un tableau
const cartArray = [values];
console.log(cartArray);

// Boucle forEach : j'éxecute la fonction addTocart, pour chaque élement, je recherche si la couleur et la quantité sont déjà ds le panier
cartArray.forEach((value) =>{
  addToCart(value.isPresent)
});

// Création d'un stockage dans le localStorage dans un tableau
let storage = localStorage.setItem(values, value);

// Recherche de l'élément pour l'ajouter au localStorage
function addToCart(isPresent){
  // Est déjà dans le panier : ne modifier que la quantité
  if ( isPresent = cartId && cartColor.value){
    this.storage.push(values.cartQuantity)
  // n'est pas déjà dans le panier alors ajouter tous les éléments)
  }else{ 
    this.storage.push(values)
  }
}

addToCart();

// Transformation de l'objet au format JSON
let objectValue = JSON.stringify(values);






/*
/// Pour la page panier

// Vérification du contenu du localStorage
const stockage = window.localStorage;
console.log(stockage);

// Transformation de l'objet récupéré dans le localStorage au format javascript pour pouvoir l'utiliser
let objValue = JSON.parse(localStorage.getItem('key'));
console.log(objValue, "key"); 
*/