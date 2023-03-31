class Producto {
    constructor(id,nombre,precio,imagen){
        this.id=id;
        this.nombre= nombre;
        this.precio= precio;
        this.imagen= imagen
    }
}
const remera= new Producto(1,"Remera",7000,"remera.jpg")
const pantalon= new Producto(2,"Pantalon",14000,"pantalon.jpg")
const buzo= new Producto(3,"Buzo",15000,"buzo.jpg")
const zapatilla=new Producto(4,"Zapatilla",40000,"zapatilla.jpg")
const media = new Producto(5,"Media",1500,"media.jpg")
const campera = new Producto(6,"Campera",30000,"campera.jpg")
const camisa = new Producto(7,"Camisa",9000,"camisa.jpg")
const botines = new Producto(8,"Botines",28000,"botines.jpg")
const div= document.createElement("div")
const criptoYa = "https://criptoya.com/api/dolar";
const divDolar = document.getElementById("divDolar");



//Muestro los productos modificando el DOM.
const productos = [remera, pantalon, buzo,zapatilla,media,campera,camisa,botines];
const contenedorProductos = document.getElementById('contenedorProductos');
productos.forEach((producto) => {
const divProducto = document.createElement('div');
divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
divProducto.innerHTML = `
                        <div class="card1" style="width: 18rem;">
                        <img class="card-img-top" src="${producto.imagen}" alt="imagen de ${producto.nombre}">
                        <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">La mejor calidad al mejor Precio.
                        ${producto.nombre}
                        </p>
                        <p class="item-price mb-0 shoppingCartItemPrice">$${producto.precio}</p>
                        <a id="boton${producto.id}" class="btn btn-primary addToCart">Agregar al Carrito</a>
                        </div>
                        </div>`;
contenedorProductos.appendChild(divProducto);
});

function finalizarCompra() {
        swal("Recuerde que puede abonar en Dolares. Que metodo va a elegir?:",
        "Pesos o Dolares?", {
        content: "input",
        })
        .then((value) => {
        swal({
            title: "¡Compra Exitosa!",
            text: "¡GRACIAS POR COMPRAR!.",
            icon: "success",
            text: `Elegiste: ${value}`,
            });
        });

}

const addToShoppingCartButton = document.querySelectorAll('.addToCart');
addToShoppingCartButton.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked)
});

const comprarButton = document.querySelector('.comprarButton');;
comprarButton.addEventListener('click',comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.card-img-top').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage,1);

    if(arrayCarrito.some((producto)=>producto.title==itemTitle))
    {
    arrayCarrito.forEach((producto)=>{
        if(producto.title==itemTitle)
        {
        producto.quantity++;
        }
    })
    }else
    {
    arrayCarrito.push({
        title:itemTitle,
        image: itemImage,
        price: itemPrice,
        quantity:1,
    })
    }


    localStorage.setItem("arrayCarrito",JSON.stringify(arrayCarrito));
    swal({
    title: "¡Se agrego correctamente al carrito!",
    icon: "success",
        });
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemQuantity) {
const elementsTitle = shoppingCartItemsContainer
    .getElementsByClassName('shoppingCartItemTitle');
    for(let i=0;i < elementsTitle.length;i++){
        if(elementsTitle[i].innerText === itemTitle){
        let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement//parentElement es para ir al elemento padre(anterior)
            .querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            updateCartShoppingTotal();
            return;
        }
    }
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${itemImage} class="shopping-cart-image">
                        <h6 class="shopping-cart-card-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}
                        </h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                        value=${itemQuantity}>
                        <button id="${itemTitle}" class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener(
        'click', removeShoppingCartItem);

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanded);

    updateCartShoppingTotal();
}

function quantityChanded(event){
    const input = event.target;
    input.value <= 0 ? (input.value=1) : null;
    updateCartShoppingTotal();
}

function removeShoppingCartItem(event) {
    const bottonClicked = event.target;
    bottonClicked.closest('.shoppingCartItem').remove();
//console.log(event.target.id);
arrayCarrito=arrayCarrito.filter((producto)=>producto.title!=event.target.id);
localStorage.setItem("arrayCarrito",JSON.stringify(arrayCarrito));
    updateCartShoppingTotal();
}

function updateCartShoppingTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {

        const shoppingCartItemPriceElement =
            shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', ''));
        const shoppingCartItemQuantityElement =
            shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}
function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    arrayCarrito=[];
    localStorage.setItem("arrayCarrito",JSON.stringify(arrayCarrito));
    updateCartShoppingTotal();
    finalizarCompra();
}
function precioDolar()
{
setInterval(() => {
    fetch(criptoYa)
    .then (response => response.json ())
    .then(({oficial, blue,})=>{
        divDolar.innerHTML= `
        <div class="dolar">
        <h5> Tipos de Dólar: </h5>
        <p>Dolar Oficial: ${oficial}</p>
        <p>Dolar Blue: ${blue}</p>
        </div>`
        
    })
    .catch(error => console.error (error))
}, 3000);
}
precioDolar();

let arrayCarrito=localStorage.getItem("arrayCarrito") ?  JSON.parse(localStorage.getItem("arrayCarrito")) : []

arrayCarrito.forEach((producto)=>
{
addItemToShoppingCart(producto.title, producto.price, producto.image, producto.quantity)
})