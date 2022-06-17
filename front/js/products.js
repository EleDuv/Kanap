let products = [];

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        products = value;
        boucle();
    })
    .catch(function(err) {
        // Une erreur est survenue
    });

function boucle (){
    for (let i =0; i < products.length; i++) {
        console.log(i);

    let productLink = document.createElement("a");
    document.getElementById("items").appendChild(productLink);
    productLink.href = "http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926";
    console.log(productLink);

    let productArticle = document.createElement("article");
    productLink.appendchild(productArticle);
    console.log(productArticle);

    let productImg = document.createElement("img");
    productArticle.appendchild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    let productTitle = document.creatElement("h3");
    productArticle.appendchild(productTitle);
    productTitle.classList.add("productName");
    productTitle.innerHTML = product.name;
    console.log(productTitle);

    let productText = document.creatElement("p");
    productArticle.appendChild(productText);
    productText.classList.add("ProductDescription");
    productText.innerHTML = product.description;
    console.log(productText);
    }
}

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");