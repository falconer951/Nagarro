import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  products=new Array();
  constructor(private router: Router, private api: AuthService,private title:Title) { }
  vendorName = sessionStorage.getItem('vendorName');
  ngOnInit(): void {
    this.title.setTitle("Notification");
    this.getOrders();
  }
  getOrders() {
    this.api.getOrderList()
      .subscribe({
        next: (res) => {
          const product=res.find((a:any)=>{
            console.log(a);
            if(a.vedorEmail===sessionStorage.getItem('vendorEmail')){
              this.products.push(a);
            }
           
          })
        }
      })
  }
  confirmOrder(data:any){
    this.api.updateStatus(data.placeId,"1")
    .subscribe(res=>{
      window.location.reload();
    })
  }
  notConfirmOrder(data:any){
    this.api.updateStatus(data.placeId,"0")
    .subscribe(res=>{
      window.location.reload();
    })
  }
  loggedOut() {
    sessionStorage.setItem('vendorEmail', null);
    sessionStorage.setItem('vendorLog', "false");
    sessionStorage.setItem('vedorName', null);
    alert("Logged Out Successfully!")
    this.router.navigate(['index']);
  }
}
