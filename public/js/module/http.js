import { Reviews , Segment } from "./helpers.js";

export async function CategyWithSub() {
  let AllCat = await fetch("https://stepprojects.ge/rest/categories", {
    method: "GET",
  });

  let JsonCat = await AllCat.json();

  for (const Cat of JsonCat) {
    let CatSub = await fetch(
      "https://stepprojects.ge/rest/subCategories?categoryId=" + Cat.id,
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
  let Products = await fetch(" https://stepprojects.ge/rest/products", {
    method: "GET",
  });

  return await Products.json();
}


export async function GetDetalsProduct() {
    let id = Segment().split('?')[1];
 
    let Products = await fetch("https://stepprojects.ge/rest/product/"+id, {
      method: "GET",
    });
  
   return await Products.json();
  }

  export async function GeReview() {
    let id = Segment().split('?')[1];
 
    let Products = await fetch(`https://stepprojects.ge/rest/product/${id}/getReviews`, {
      method: "GET",
    });
  
   return await Products.json();
  }


  export async function GetCart() {
    let Carts = await fetch("https://stepprojects.ge/rest/getBasket", {
      method: "GET",
    });
   return await Carts.json();
  }

  export async function CartUpdate(id, quantity)  {
    let Respons = await fetch(`https://stepprojects.ge/rest/basket/${id}/update?quantity=${quantity}`, {
      method:'PUT',
      
    })
   
   return await Respons.json();
  }

  export async function CartDelate(id)  {
    let Respons = await fetch(`https://stepprojects.ge/rest/basket/${id}/remove`, {
      method: "DELETE",

      headers:{
        Accept: 'application/json',
        
      }
    });
   return await Respons.json();
  }


  export async function GetBrand()  {
    let Brands = await fetch(`https://stepprojects.ge/rest/brands`, {
      method: "GET",
 
    });
   return await Brands.json();
  }



  export async function BaseFilter(query)  {
    let Response = await fetch(`https://stepprojects.ge/rest/products`+query, {
      method: "GET",
 
    });
   return await Response.json();
  }