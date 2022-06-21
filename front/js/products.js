// Tableau des produits
let products;

// Appel de l'API pour récupérer les produits
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

// Création des cards des produits
function boucle (){
    for (let i = 0; i < products.length; i++) {
        console.log(i);

    let productLink = document.createElement("a");
    productLink.href = './product.html?id='+products[0]._id;

    let productArticle = document.createElement("article");
    
    let productImg = document.createElement("img");
    productImg.src = products[i].imageUrl;
    productImg.alt = products[i].altTxt;

    let productTitle = document.createElement("h3");
    productTitle.classList.add("productName");
    productTitle.innerText = products[i].name;

    let productText = document.createElement("p");
    productText.classList.add("ProductDescription");
    productText.innerHTML = products[i].description;
  
    productArticle.appendChild(productText);
    productArticle.appendChild(productTitle);
    productArticle.appendChild(productImg);
    productLink.appendChild(productArticle);
    document.getElementById("items").appendChild(productLink);
    }
    console.log(products);
}
