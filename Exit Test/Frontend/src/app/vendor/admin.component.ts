import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Product } from './product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  totalOrder:any;
  totalConfirmed=0;
  totalNotConfirmed=0;
  totalSale=0;
  records=new Array();
  product:Product[]=[];
  searchText:string;
  productObj:Product=new Product();
  productForm: FormGroup;
  constructor(private http: HttpClient, private api: AuthService, private formBuilder: FormBuilder,private router:Router,private title:Title) { }
  fileToUpload: File = null;
  imageUrl: string = "/assets/img/noimage.png";
  products:any
  showAddBtn:boolean;
  showUpdateBtn:boolean;
  vendorEmail=sessionStorage.getItem('vendorEmail');
  vendorName=sessionStorage.getItem('vendorName');
  currentEmail:string;
  ngOnInit(): void {
    this.title.setTitle("Vendor Home");
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      productPrice: ['',Validators.required],
      productDiscount: ['',Validators.required],
      productImage: ['',Validators.required],
      productDesc:['',Validators.required]
    })
    this.getAllProduct();
    this.getRecords();
  }
  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
  }

  productAdd() {
    this.api.addProduct(this.productForm.value.productName,this.productForm.value.productPrice,this.productForm.value.productDiscount,this.productForm.value.productDesc,this.productForm.value.productImage,sessionStorage.getItem('vendorEmail'))
    .subscribe({
      next: (res) => {
        alert("Product added successfully!");
        
        console.log(res);
        let ref = document.getElementById('cancel')
        ref?.click();
        this.productForm.reset();
        window.location.reload();
      },
      error: (err) =>
        alert("Something Went Wrong!")

    });
  }
  clickAddBtn() {
    this.productForm.reset();
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }

  
  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next: (res) => {
        let vendor = res.find((a: any) => {
          if(a.vendorEmail === sessionStorage.getItem('vendorEmail')){
            this.product.push(a);
          }
        });

        console.log(this.products)
        console.log(res);
        this.products=this.product;
        
      }
    });
  }
  deleteProduct(product:any){
    console.log(product.productid);
    this.api.deleteProduct(product.productid)
    .subscribe(res => {
      alert("Product Deleted Successfully!")
      this.getAllProduct();
      window.location.reload();
    });
  }
  onEdit(product: any) {
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    console.log(product.productid);
    this.productObj.productid=product.productid;
    this.productForm.controls['productName'].setValue(product.productName);
    this.productForm.controls['productDesc'].setValue(product.productDesc);
    this.productForm.controls['productPrice'].setValue(product.productPrice);
    this.productForm.controls['productDiscount'].setValue(product.productDiscount);
    this.productForm.controls['productImage'].setValue(product.productImage);
  }
  updateProduct(){
    this.productObj.productname = this.productForm.value.productName;
    this.productObj.description = this.productForm.value.productDesc;
    this.productObj.price = this.productForm.value.productPrice;
    this.productObj.discount = this.productForm.value.productDiscount;
    this.productObj.productimage = this.productForm.value.productImage;
    this.api.updateProduct(this.productObj.productid,this.productObj.productname,this.productObj.description,this.productObj.price,this.productObj.discount,this.productObj.productimage,sessionStorage.getItem('vendorEmail'))
    .subscribe({
      next: (res) => {
        alert("Product Updated Successfully!!");
        console.log(res);
        let ref = document.getElementById('cancel')
        ref?.click();
        this.productForm.reset();
        window.location.reload();
      },
      error: (err) => alert("Can Updadate Only!")
    });

  }
  loggedOut(){
    sessionStorage.setItem('vendorEmail', null);
    sessionStorage.setItem('vendorLog',"false");
    sessionStorage.setItem('vendorName', null);
    alert("Logged Out Successfully!")
    this.router.navigate(['index']);
  }

  getRecords(){
    this.api.getOrderList()
      .subscribe({
        next: (res) => {
          const product=res.find((a:any)=>{
            console.log(a);
            if(a.vedorEmail===sessionStorage.getItem('vendorEmail')){
              this.records.push(a);
            }
          })
          this.totalOrder=this.records.length;
          for(let i=0;i<this.records.length;i++){
            if(this.records[i].orderStatus==="Confirmed"){
              this.totalConfirmed+=1;
              this.totalSale+=this.records[i].totalPrice;
            }
          }
          this.totalNotConfirmed=this.totalOrder-this.totalConfirmed;
        }
      })
    }
}
