import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Item } from './item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartForm:FormGroup;
  formValue:FormGroup;
  discount:number=0;
  totalPrice:number=0;
  total:number=0;
  saving:number=0;
  customerName=sessionStorage.getItem('customerName');
  item:Item[]=[];
  items:any;
  searchText:any;
  address=new Array();
  addresses=new Array();
  cartBtn=false;
  orderBtn=false;
  checkBtn=false;
  constructor(private api:AuthService,private formBuilder:FormBuilder,private router :Router,private title:Title){}
  ngOnInit(): void {
     this.title.setTitle("Cart");
    this.cartForm=this.formBuilder.group({
      quantity:['1']
    })
    this.formValue=this.formBuilder.group({
      address: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      zipcode: ['',Validators.required],
      phonenumber: ['',Validators.required]
    })
    this.getCartItem();
    this.getAddress();
    
  }
  getCartItem(){
    
    this.api.getCartItem()
    .subscribe({next:res=>{
      let vendor = res.find((a: any) => {
        if(a.customerEmail === sessionStorage.getItem('customerEmail')){
          this.item.push(a);
          this.checkBtn=true;
          this.cartBtn=true;
        }
      })
      console.log(this.item);
      this.items=this.item;
      for(let i=0;i<this.item.length;i++){
        this.discount=(1-(this.item[i].productDiscount)/100)*(this.item[i].productPrice)*(this.item[i].quantity);
        this.totalPrice+=this.discount;
        this.total+=(this.item[i].productPrice*this.item[i].quantity);
      }
      this.saving=this.total-this.totalPrice;
    }
  })
  }

  updateCart(data:any){
    this.api.updateCart(data.orderId,this.cartForm.value.quantity)
    .subscribe(res=>{
      window.location.reload();
    })
  }
  deleteCart(data:any){
    this.api.deleteCartItems(data.orderId)
    .subscribe(res=>{
      alert("Item Deleted Successfully");
      window.location.reload();
    })
    
  }
  getAddress() {
    this.api.getAddress()
      .subscribe({
        next: res => {
          let vendor = res.find((a: any) => {
            if (a.customerEmail === sessionStorage.getItem('customerEmail')) {
              this.address.pop();
              this.address.push(a);
              this.orderBtn=true;
            }
            
            console.log(this.address);
            
          })
        }
      })
  }
  addAdress() {
    this.api.addAddress(this.formValue.value.address, this.formValue.value.city, this.formValue.value.state, this.formValue.value.country, this.formValue.value.zipcode, this.formValue.value.phonenumber, sessionStorage.getItem('customerEmail'))
      .subscribe(res => {
        alert("Address Updated Successfully!")
        window.location.reload();
      })
  }
  placeOrder(){
    this.api.placeOrder(sessionStorage.getItem('customerEmail'),this.totalPrice)
    .subscribe(res => {
      setTimeout(function(){
        window.location.reload();
     }, 1700);
    })
  }
  loggedOut() {
    sessionStorage.setItem('customerEmail', null);
    sessionStorage.setItem('customerLog', "false");
    sessionStorage.setItem('customerName', null);
    alert("Logged Out Successfully!")
    this.router.navigate(['index']);
  }
}