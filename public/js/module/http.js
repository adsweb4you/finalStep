import { Reviews , Segment } from "./helpers.js";

const ApiUrl = 'https://stepprojects.ge/'

export async function CategyWithSub() {
  let AllCat = await fetch(ApiUrl + "rest/categories", {
    method: "GET",
  });

  let JsonCat = await AllCat.json();

  for (const Cat of JsonCat) {
    let CatSub = await fetch(
      ApiUrl + "rest/subCategories?categoryId=" + Cat.id,
      {
        method: "GET",
      }
    );
    Cat.Subcat = [];
    let JsonSub = await CatSub.json();

    for (const Sub of JsonSub) {
      let Catindex = JsonCat.findIndex((Cat) => {
        return Cat.id == Sub.categoryId;
      });

      JsonCat[Catindex].Subcat.push(Sub);
    }
  }
  return await JsonCat;
}

export async function GetAllProduct() {
  let Products = await fetch(ApiUrl + "rest/products", {
    method: "GET",
  });

  return await Products.json();
}


export async function GetDetalsProduct() {
    let id = Segment().split('?')[1];
 
    let Products = await fetch(ApiUrl + "rest/product/"+id, {
      method: "GET",
    });
  
   return await Products.json();
  }

  export async function GeReview() {
    let id = Segment().split('?')[1];
 
    let Products = await fetch(`${ApiUrl}rest/product/${id}/getReviews`, {
      method: "GET",
    });
  
   return await Products.json();
  }


  export async function GetCart() {
    let Carts = await fetch(ApiUrl + "rest/getBasket", {
      method: "GET",
    });
   return await Carts.json();
  }

  export async function AddCart(id) {
    let Carts = await fetch(ApiUrl + "rest/addToBasket", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        "productId":id,
        "quantity": 1
      })
    });
   return await Carts.json();
  }

  export async function CartUpdate(id, quantity)  {
    let Respons = await fetch(`${ApiUrl}rest/basket/${id}/update?quantity=${quantity}`, {
      method:'PUT',
      
    })
   
   return await Respons.json();
  }

  export async function CartDelate(id)  {
    let Respons = await fetch(`${ApiUrl}rest/basket/${id}/remove`, {
      method: "DELETE",

      headers:{
        Accept: 'application/json',
        
      }
    });
   return await Respons.json();
  }


  export async function GetBrand()  {
    let Brands = await fetch(`${ApiUrl}rest/brands`, {
      method: "GET",
 
    });
   return await Brands.json();
  }



  export async function BaseFilter(query)  {
    let Response = await fetch(`${ApiUrl}rest/products`+query, {
      method: "GET",
 
    });
   return await Response.json();
  }