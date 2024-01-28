let shop = document.getElementById("row-1");
// console.log(shop);



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () =>{
    return (shop.innerHTML =shopItemsData.map((x)=>{
        let {id,name,price,desc,img} =x;
        let search =basket.find((x)=>x.id === id) ||[]
        return `<div id=product-id-${id} class="col-md-6 col-lg-4 item">
        <!-- <a class="lightbox" href=${img}> -->
            <div><img style="height:60vh;" class="image-size img-fluid image scale-on-hover" src=${img}></div>
            
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined? 0:search.item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>
                </div>
            </div>
        <!-- </a> -->
    </div>`
    })
    .join(""));

}

generateShop();

let increment = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x)=> x.id===selectedItem.id); 

    if(search === undefined){
        basket.push({
        id: selectedItem.id,
        item: 1,
    });}
    else{
        search.item+=1;
    }
    
    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x)=> x.id===selectedItem.id); 
    if(search === undefined) return;
    else if(search.item === 0)return ;
    else{
        search.item-=1;
    }
    update(selectedItem.id);
    
    basket = basket.filter((x) => x.item !==0)

    // console.log(basket);

    localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculations();
};

let calculations = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    // console.log(basket.map((x)=>x.item));
    // console.log(basket);
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
};

calculations(); 