let basket = JSON.parse(localStorage.getItem("data")) || [];
let label =document.getElementById("label");
let totalPrice = document.getElementById("totalPrice");
let shoppingCart = document.getElementById("shoppingCart");
let cart = document.getElementById("row-1");


let calculations = () => {
    let cartIcon = document.getElementById("cartAmount");
    // console.log(basket.map((x)=>x.item));
    // console.log(basket);
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculations();

let generateCartItem = () => {
    if (basket.length != 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
                <div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                  <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="${search.img}"
                        class="img-fluid rounded-3" alt="">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <p class="lead fw-normal mb-2">${search.name}</p>
                        <p><span class="text-muted">$${search.price}</span></p>
                    </div>

                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>

                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 class="mb-0">$${search.price * item}</h5>
                    </div>                  
                  </div>
                </div>
              </div>
            `;
            })
            .join(""));
    }
    else {
        cart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="store.html">
        <button type="button" onclick="clearCart()" class="btn btn-outline-warning btn-lg ms-3">Back to Home</button>
        </a>`;
    }
};

generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }

    generateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);

    basket = basket.filter((x) => x.item !== 0)

    // console.log(basket);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculations();
    totalAmount();
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        totalPrice.innerHTML = "$" + amount;
    }
    else return;
};

totalAmount();

let clearCart = () => {
    basket = [];
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
}