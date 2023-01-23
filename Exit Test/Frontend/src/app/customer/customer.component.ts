import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Cart } from './cart';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  products: any;
  searchText:string
  cart: Cart = new Cart();
  customerName = sessionStorage.getItem('customerName');
  cartForm: FormGroup;
  formValue: FormGroup;
  address=new Array();
  constructor(private router: Router, private api: AuthService, private formBuilder: FormBuilder,private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("Home");
    this.cartForm = this.formBuilder.group({
      quantity: [1, Validators.required],
    })
    this.formValue = this.formBuilder.group({
      address: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      zipcode: ['',Validators.required],
      phonenumber: ['',Validators.required]
    })
    this.getAddress();
    this.getAllProduct();
    
  }

  getAllProduct() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.products = res;
          console.log(res);
        }
      });
  }

  addToCart(data: any) {
    this.api.addCartItem(data.productid, data.productName, data.productPrice, data.productDiscount, this.cartForm.value.quantity, data.vendorEmail, sessionStorage.getItem('customerEmail'))
      .subscribe({
        next: (res) => {
          alert("Product Added to Cart Successfully!");
          console.log(res);
        }
      });
  }
  // onEdit(row: any) {

  //   this.formValue.controls['rollno'].setValue(row.rollno);
  //   this.formValue.controls['name'].setValue(row.name);
  //   this.formValue.controls['dob'].setValue(row.dob);
  //   this.formValue.controls['score'].setValue(row.score);
  // }

  addAdress() {
    this.api.addAddress(this.formValue.value.address, this.formValue.value.city, this.formValue.value.state, this.formValue.value.country, this.formValue.value.zipcode, this.formValue.value.phonenumber, sessionStorage.getItem('customerEmail'))
      .subscribe(res => {
        alert("Address Updates Successfully!")
        window.location.reload();
      })
  }

  getAddress() {
    this.api.getAddress()
      .subscribe({
        next: res => {
          let vendor = res.find((a: any) => {
            if (a.customerEmail === sessionStorage.getItem('customerEmail')) {
              this.address.push(a);
              return;
            }
            
          })
        }
      })
  }
  loggedOut() {
    sessionStorage.setItem('customerEmail', null);
    sessionStorage.setItem('customerLog', "false");
    sessionStorage.setItem('customerName', null);
    alert("Logged Out Successfully!")
    this.router.navigate(['index']);
  }
  goCart() {
    this.router.navigate(['cart']);
  }

}
