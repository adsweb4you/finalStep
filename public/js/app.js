import { 
  CategyWithSub , 
  GetAllProduct , 
  GetDetalsProduct , 
  GetCart ,
  CartUpdate , 
  CartDelate,
  GetBrand,
  GeReview,
  BaseFilter
 } from "./module/http.js";
import { Reviews , Segment } from "./module/helpers.js";

 

let showMore = document.querySelector(".more");

showMore?.addEventListener("click", (e) => {
  e.preventDefault();
  showMore.innerText =
    showMore.innerText == "Show more" ? "Show Less" : "Show more";
  document.querySelector(".prodinfo p").classList.toggle("show");
});

async function DisplayCat() {

  if (Segment() !== 'index.html') {
    return false;
  }

  let Data = await CategyWithSub();

  let subcat = '';
  for (const Cat of Data) {

    for (const Subc of Cat.Subcat) {
      subcat += ` <li><a href="${Subc.id}">${Subc.name}</a></li>`
    }

    let HtmlCats = `
    <li>
    <a href="${Cat.id}">${Cat.name} <img src="public/images/icons/right.svg" alt=""></a>
     <ul>
        ${subcat}
     </ul>
</li>
    `;
   document.querySelector('.category').innerHTML += HtmlCats;
  }
}

// display category
DisplayCat();

async function DisplayProd() {
  if (Segment() !== 'index.html') {
    return false;
  }
  let Products = await GetAllProduct();
 
 let maxrev = Math.ceil(Math.max(...Products.map(o => o.reviewsAvg)))
 
    for (const Product of Products) {

        let HtmlProd = `
        <div class="col-lg-4">
        <div class="product">
          <img src="${'data:image/png;base64'+Product.pic}" alt="">
          <div class="prod-body">
              <h2><a href="detals.html?${Product.id}"> ${Product.name} </a></h2>
                  <div class="star">
                      ${Reviews(maxrev,Product.reviewsAvg)}
                  </div>
                  <p class="mb-0">${Product.price} GEL</p>
          </div>
        </div>
      </div>
    `;
    document.querySelector('.content').innerHTML += HtmlProd;
    }
 
}

// display Product
DisplayProd();


async function DysplatDetals(){

if(Segment().split('?')[0] !== 'detals.html'){
  return false
}

  let Product = await GetDetalsProduct();  
 
  let title = document.querySelector('.prodinfo h1');
  let img = document.querySelector('.poste');
  let price = document.querySelector('.price');
  let descr = document.querySelector('.prodinfo p');
  let tabtxt = document.querySelector('.tabp');
   title.innerText = Product.name;
   price.innerText = Product.price + ' ??? ';
   img.src = Product.pic;
   descr.innerText = Product.description;
   tabtxt.innerText = Product.description;

   let allReviews = await GeReview()
   
   let maxrev = Math.ceil(Math.max(...allReviews.map(o => o.rating)))
 
   for (const Review of allReviews) {

       let Htmlrev = `

       <div class="rews">
             <h3>${Review.username}</h3>
             <div class="stars">
             ${Reviews(maxrev,Review.rating)}
             </div>
             <div class="comment">
                <p>${Review.comment}</p>
             </div>
          </div>
   `;
   document.querySelector('#profile-tab-pane').innerHTML += Htmlrev;
   }
}

DysplatDetals();
 

 async function Mycart(){
  if (Segment() !== 'cart.html') {
    return false;
  }
  let Carts = await GetCart(); 
  
  for (const Cart of Carts) {

    let HtmlCart = `
    <div class="row prods">
    <div class="col-lg-3 ps-lg-0">
      <img
        class="prodimg"
        src="${Cart.product.pic}"
        alt=""
      />
    </div>
    <div class="col-lg-4">
      <div class="text-body">
        <h2>
        ${Cart.product.name}
        </h2>
        <div class="star">
        ${Reviews(5,Cart.product.reviewsAvg)}
        </div>
        <small>Reviews  ${Cart.product.reviewsCount}</small>
      </div>
    </div>
    <div class="col-lg-2 pe-lg-0">
      <div class="quant">
        <div class="update">
          <button class="plus" data-operator="-" data-cartid="${Cart.id}">
            <svg
              width="10"
              height="4"
              viewBox="0 0 10 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.232 0.528H9.164V3.944H0.232V0.528Z"
                fill="#121212"
              />
            </svg>
          </button>
          <span>${Cart.quantity}</span>
          <button class="min" data-operator="+"  data-cartid="${Cart.id}">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.268 4.996H12.496V8.412H8.268V12.78H4.6V8.412H0.344V4.996H4.6V0.627999H8.268V4.996Z"
                fill="#FB6F20"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-3 ps-lg-0">
      <div class="price-sec d-flex align-items-center">
        <p class="mb-0">${Cart.price} GEL</p>
        <button class="btn btnremove" data-cartid="${Cart.id}">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7344 40.75C12.9531 40.75 12.2891 40.4766 11.7422 39.9297C11.1953 39.3828 10.9219 38.7188 10.9219 37.9375V11.2188H9V8.40625H17.8125V7H30.1875V8.40625H39V11.2188H37.0781V37.9375C37.0781 38.6875 36.7969 39.3438 36.2344 39.9062C35.6719 40.4688 35.0156 40.75 34.2656 40.75H13.7344ZM34.2656 11.2188H13.7344V37.9375H34.2656V11.2188ZM18.7031 33.9062H21.5156V15.2031H18.7031V33.9062ZM26.4844 33.9062H29.2969V15.2031H26.4844V33.9062Z"
              fill="#121212"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
`;
document.querySelector('.cartoutput').innerHTML += HtmlCart;
 
 let CartUpdatebtn = document.querySelectorAll('.update button');
 let Removebtn = document.querySelectorAll('.btnremove');

 for (const btn of CartUpdatebtn) {
  btn.addEventListener('click', async function(){
       let id = this.getAttribute('data-cartid');
       let oper = this.getAttribute('data-operator');
       let Count  = document.querySelector('.update span').innerText;
       let CountCart  = oper == '+' ? Number(Count) + 1 : Count - 1
       document.querySelector('.update span').innerText = CountCart;
       let res = await CartUpdate(id, CountCart);
        console.log(res);
  })
 }

 for (const btnrem of Removebtn) {
  btnrem.addEventListener('click', async function(){
       let id = this.getAttribute('data-cartid');
      
       let res = await CartDelate(id);
       console.log(res);
  })
 }

}
 }

//  getallcard
 Mycart();

 
 async function GetSearchCat(){
  if (Segment() !== 'search.html') {
    return false;
  }

  let Data = await CategyWithSub();
 
 
  let subcat = '';
  for (const Cat of Data) {

    for (const Subc of Cat.Subcat) {
       
      subcat += `<li><a href="#" data-subid="${Subc.id}">${Subc.name}</a></li>`
    
    }

  
    
    let HtmlCats = `
    <li class="inside" data-id="${Cat.id}">
    <a href="" data-cat="${Cat.id}">${Cat.name}  </a>
     <ul>
        ${subcat}
     </ul>
</li>
    `;
   document.querySelector('.category').innerHTML += HtmlCats;
  }

  let allSubcat = document.querySelectorAll('.inside ul li a');

 

  allSubcat.forEach(el=>{
    el.addEventListener('click' , function(e){
      e.preventDefault();
      let curr = document.querySelector('.curr');
      curr?.classList.remove('curr')
      this.classList.add('curr')
    })
  })

  let catlist = document.querySelectorAll(".inside > a"); //category link

for (const el of catlist) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    let active = document.querySelector(".show");
    if (this.parentElement.children[1].classList[0] != "show") {
      active?.classList.remove("show");
    }
    this.parentElement.children[1].classList.toggle("show");
  });
}

  let Brands = await GetBrand();

  for (const brand of Brands) {
    let HtmlBrand = `
    <div class="form-check">
            <input class="form-check-input" type="radio" name="brandId" value="${brand.id}" id="chk${brand.id}">
            <label class="form-check-label" for="chk${brand.id}">
                ${brand.name}
            </label>
          </div>
    `;
    document.querySelector('.bybrand').innerHTML += HtmlBrand;
  }

 }

//  search page cat
 GetSearchCat();


 function SetStar(){
    let allstar = document.querySelectorAll('.star img');
    allstar.forEach(el=>{
      el.addEventListener('click', function(){
        let active = document.querySelector('img.active');
        active?.classList.remove('active')
        this.classList.add('active')
      })
    })

 }

 SetStar();

async function Submit(){

  let Sb = document.querySelector('.btn-ok');
  Sb?.addEventListener('click', async function(e){
  e.preventDefault();
  LoadProd();
  })

 
  window.addEventListener('load', async function(e){
  e.preventDefault();
    LoadProd();
  })

}

Submit();

async function LoadProd(){
  if (Segment() !== 'search.html') {
    return false;
  }
  document.querySelector('#innerSearch').innerHTML = '';
  let CatID = document.querySelector('.show')?.parentElement.getAttribute('data-id');
  let SubID = document.querySelector('.curr')?.getAttribute('data-subid');
  let BrandID = document.querySelector('[name="brandId"]:checked')?.value;
  let MinPrice = document.querySelector('#min')?.value;
  let MaxPrice = document.querySelector('#max')?.value;
  let Star = document.querySelector('img.active')?.getAttribute('data-star');

  let obj = {
    categoryId:CatID,
    subCategoryId:SubID,
    brandId:BrandID,
    priceFrom:MinPrice,
    priceUntil:MaxPrice,
    avgRating:Star
  }

  let QueryStr = '?' + new URLSearchParams(obj).toString();
 
   let Prods = await BaseFilter(QueryStr);
   let maxrev = Math.ceil(Math.max(...Prods.map(o => o.reviewsAvg)))
 
   for (const Product of Prods) {

       let HtmlProd = `

       <div class="row prods">
       <div class="col-lg-3 ps-lg-0">
           <img class="prodimg" src="${'data:image/png;base64'+Product.pic}" alt="">
       </div>
       <div class="col-lg-5">
          <div class="text-body">
          <h2><a href="detals.html?${Product.id}"> ${Product.name} </a></h2>
               <div class="star">
               ${Reviews(maxrev,Product.reviewsAvg)}
                   </div>
                   <small>Reviews ${Product.reviewsCount}</small>
          </div>
       </div>
       <div class="col-lg-4">
           <div class="price-sec">
               <p class="mb-0">${Product.price} GEL</p>
               <button class="btn addcard">???????????????????????? ????????????????????????</button>
           </div>
       </div>
   </div>
 
   `;
   document.querySelector('#innerSearch').innerHTML += HtmlProd;
   }
}

 