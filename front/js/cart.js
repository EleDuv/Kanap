// Récupération des info du localStorage
async function getInfo(){
    let productStorage = localStorage.getItem("cart");
    for (let i of Object.entries(productStorage)){
        const responseJSON = await fetch ("http://localhost:3000/api/products/" + productStorage[i].idProduct);
        const responseJS = await responseJSON.json();
    }
    itemInfo(responseJS);
}


// Création des éléments du DOM
function itemInfo(){
    let cart = JSON.parse(localStorage.getItem("cart"));

    let section = document.getElementById("cart__items");

    for (let product of cart){

        let article = document.createElement("article");
        article.className = "cart__item";
        article.setAttribute("data-id", product.id);
        article.setAttribute("data-color", product.color);
        console.log(article);
        
        /*let imgDiv = document.createElement("div");
        imgDiv.className = "cart__item__img";

        let img = document.createElement("img");
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altText);
        */
        let content = document.createElement("div");
        content.className = "cart__item__content";
        
        let contentDescription = document.createElement("div");
        contentDescription.className = "cart__item__content__description";
        
        let contentTitle = document.createElement("h2");
        contentTitle.innerHTML = product.name;
        
        let contentColor = document.createElement("p");
        contentColor.innerHTML = product.color;
        
        let contentPrice = document.createElement("p");
        contentPrice.innerHTML = product.price;
        
        let contentSettings = document.createElement("div");
        contentSettings.className = "cart__item__content__settings";
        
        let contentQuantity = document.createElement("div");
        contentQuantity.className = "cart__item__content__settings__quantity";
        
        let quantity = document.createElement("p");
        quantity.innerHTML = product.quantity;
        
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.className = "itemQuantity";
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        
        let contentDelete = document.createElement("div");
        contentDelete.className = "cart__item__content__settings__delete";
        
        let deleteItem = document.createElement("div");
        deleteItem.className = "deleteItem";

        section.appendChild(article);
        //article.appendChild(imgDiv);
        //imgDiv.appendChild(img);
        //article.appendChild(content);
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
}
itemInfo();
// getInfo();


/// Récupération des infos du DOM

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

// Affichage des produits
function domInfo(){
    for (let i = 0; i < products.length; i++){
        
        let imgDiv = document.createElement("div");
        imgDiv.className = "cart__item__img";

        let img = document.createElement("img");
        img.setAttribute("src", products[i].imageUrl);
        img.setAttribute("alt", products[i].altText);
        
        let content = document.createElement("div");
        content.className = "cart__item__content";

        article.appendChild(imgDiv);
        imgDiv.appendChild(img);
        article.appendChild(content);
    }
}

domInfo();

/*
// Suppression d'article 
function removeFromCart(item){
    let productStorage = localStorage.getItem("cart");
    productStorage = productStorage.filter(el => el.id != item.idProduct);
    localStorage.setItem("cart", JSON.stringify(productStorage));
}

// Modification de la quantité 
function changeQuantity(product, quantity){
    let productStorage = localStorage.getItem("cart");
    let foundItem = cart.find(el => el.cartId == idProduct && el.cartColor == cartColor.value);
    if (foundItem != undefined) {
      foundItem.cartQuantity = cartQuantity.value;
      if (foundItem.cartQuantity <= O){
          removeFromCart(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(productStorage));
}

// Obtention du nombre d'articles
function getNumberProduct(){
    let productStorage = localStorage.getItem("cart");
    let number = 0;
    for (let )
    return 
}*/