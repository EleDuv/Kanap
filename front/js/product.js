//Récupération de l'id via les paramètres de l'URL
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
//let product;

//Requête de l'API
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

//Fonction pour la récupération des infos des produits
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

//Appel de la fonction de requête de l'API
productApi();


