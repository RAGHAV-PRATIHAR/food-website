if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
function ready(){
    var removecartitems=document.getElementsByClassName('btn-danger');
    for(var i=0;i<removecartitems.length;i++){
        var button=removecartitems[i];
        button.addEventListener('click',removecartitem)
 }
   var quantityinputs=document.getElementsByClassName('cart-quantity-input')
   for(var i=0;i<quantityinputs.length;i++){
    var input=quantityinputs[i];
    input.addEventListener('change',quantityChanged)
   }

   var addtocartbuttons=document.getElementsByClassName('shop-item-button')
   for(var i=0;i<addtocartbuttons.length;i++){
        var button=addtocartbuttons[i];
        button.addEventListener('click',addToCartClicked)
   }
   document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}


function purchaseClicked(){
    alert('Thank you for ordering')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updatecarttotal()
}
function removecartitem(event)
{
           var buttonclicked=event.target;
           buttonclicked.parentElement.parentElement.remove();
           updatecarttotal();
}

function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value)||input.value<=0){
        input.value=1
    }
    updatecarttotal();
}

function addToCartClicked(event){
    var button=event.target
    var shopitem=button.parentElement.parentElement
    var title=shopitem.getElementsByClassName('shop-item-title')[0].innerText;
    var price=shopitem.getElementsByClassName('shop-item-price')[0].innerText;
    console.log(title,price);
    addItemToCart(title,price);
    updatecarttotal();
}

function addItemToCart(title,price){
    var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('This item is already added to the cart')
            return 
        }
    }
    var cartrowcontents=` <div class="cart-item cart-column">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
cartRow.innerHTML=cartrowcontents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartitem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged) 
}
function updatecarttotal(){
    var caritemcontainer=document.getElementsByClassName('cart-items')[0];
    var cartrows=caritemcontainer.getElementsByClassName('cart-row');
    var total=0;
    for(var i=0;i<cartrows.length;i++){
        var cartrow=cartrows[i]
        var priceElement=cartrow.getElementsByClassName('cart-price')[0];
        var quantityElement=cartrow.getElementsByClassName('cart-quantity-input')[0];
        var price=parseFloat(priceElement.innerText.replace('₹',''))
        var quantity=quantityElement.value 
         total=(total+(price*quantity)*10)/100+total+(price*quantity)
    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='₹'+total+'(GST incl.)'
}
