import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<any>("http://localhost:1000/users/register");
  }

  registerUser(user: any) {
    return this.http.post("http://localhost:1000/users/register", user);
  }

  addProduct(
     prodname: string, prodprice: string, proddisc: string, proddesc: string, image: File, vendor: string) {
    const formData: FormData = new FormData();
    formData.append("proddesc", proddesc);
    formData.append("price", prodprice);
    formData.append("productname", prodname);
    formData.append("proddisc", proddisc);
    formData.append("file", image);
    formData.append("vendor", vendor);
    return this.http.post("http://localhost:1000/vendor/products", formData);
  }

  getProduct() {
    return this.http.get<any>("http://localhost:1000/vendor/products");
  }

  deleteProduct(productid:number){
    console.log(productid)
    return this.http.delete<any>("http://localhost:1000/vendor/products"+ "?productid=" + productid)
  }
  updateProduct(prodid:any,prodname:string,proddesc:string,prodprice:string,proddisc:string,prodimage:string,vendor: string){
    const formData: FormData = new FormData();
    formData.append("proddesc", proddesc);
    formData.append("price", prodprice);
    formData.append("productname", prodname);
    formData.append("proddisc", proddisc);
    formData.append("file", prodimage);
    formData.append("productid", prodid);
    formData.append("vendor", vendor);
    return this.http.put("http://localhost:1000/vendor/products",formData);
  }

  isVendorLoggedIn(){
    if(sessionStorage.getItem('vendorLog')=="true"){
      return true;
    }
    return false;
  }

  addCartItem(prodid:any,prodname:string,prodprice:string,proddisc:string,prodquant:string,vendor:string,customer:string){
    const formData:FormData=new FormData();
    formData.append("productid",prodid);
    formData.append("productname", prodname);
    formData.append("price", prodprice);
    formData.append("proddisc", proddisc);
    formData.append("prodquant",prodquant);
    formData.append("vendor", vendor);
    formData.append("customer",customer);
    return this.http.post("http://localhost:1000/customer/addcart",formData);
  }
  
  getCartItem(){
    return this.http.get<any>("http://localhost:1000/customer/getcart");
  }

  updateCart(orderId:any,quantity:string){
    const formData:FormData=new FormData();
    formData.append("orderid",orderId);
    formData.append("prodquant",quantity);
    return this.http.put("http://localhost:1000/customer/updatecart",formData);
  }
  deleteCartItems(orderid:number){
    return this.http.delete<any>("http://localhost:1000/customer/deletecart"+"?orderid=" + orderid);
  }

  addAddress(address:string,city:string,state:string,country:string,zipcode:string,phonenumber:string,customer:string){
    const formData:FormData=new FormData();
    formData.append("address",address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipcode",zipcode);
    formData.append("phonenumber", phonenumber);
    formData.append("customer",customer);
    return this.http.post("http://localhost:1000/customer/address",formData);
  }

  getAddress(){
    return this.http.get<any>("http://localhost:1000/customer/address");
  }
  placeOrder(customer:string,price:any){
    const formData:FormData=new FormData();
    formData.append("customer",customer);
    formData.append("price",price);
    return this.http.post<any>("http://localhost:1000/customer/orders",formData);
  }
  getOrderList(){
    return this.http.get<any>("http://localhost:1000/customer/orderlist");
  }

  deleteOrder(placedid:number){
    return this.http.delete<any>("http://localhost:1000/customer/cancelorder"+"?placedid=" + placedid);
  }

  updateStatus(id:string,status:string){
    const formData:FormData=new FormData();
    formData.append("placedid",id);
    formData.append("status",status)
    return this.http.put("http://localhost:1000/vendor/updatestatus",formData);
  }

  isCustomerLoggedIn(){
    if(sessionStorage.getItem('customerLog')=="true"){
      return true;
    }
    return false;
  }

}
