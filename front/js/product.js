let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
let product;

//Requêter l'API

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

function displayOptions (colors ) {
  colors.map((color) => {
      `<option>${color}<option>`
  })  
}

function productInfo(product) {
  let imgContainer = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  imgContainer.appendChild(productImg);

  let productTitle = document.getElementById("title");
  productTitle.innerText = product.name;
  console.log(productTitle);

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;
  console.log(productPrice);

  let productDescription = document.getElementById("description");
  productDescription.innerText = product.description;
  console.log(productDescription);

  /*document.getElementById("colors");
  let productColor = document.createElement("option");
  productColor.setAttribute(value);
  productColor.innerText = product.color;
  console.log(productColor);*/

  console.log(productInfo);
}

productApi();
