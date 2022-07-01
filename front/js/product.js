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
const cartId = idProduct;
console.log(cartId);
const cartColor = document.querySelector("#colors");
console.log(cartColor);
const cartQuantity = document.querySelector("#quantity");
console.log(cartQuantity);

// Création d'un tableau de stockage dans le localStorage
function saveCart(cartItem){
  localStorage.setItem("cart", JSON.stringify(cartItem));
}

// Récupération du tableau du localStorage
function getCart(){
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    return [{
      cartId : idProduct,
      cartColor : cartColor.value,
      cartQuantity : cartQuantity.value,
    }];
  } else {
    return JSON.parse(cart);
  }
}

// Ajout d'articles au panier
function addToCart(){
  let cart = getCart();
  let foundItem = cart.find(el => el.cartId == idProduct && el.cartColor == cartColor);
    if (foundItem != undefined) {
      foundItem.cartQuantity = cartQuantity.value;
    }
    saveCart(cart);
}
