import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  customerName = sessionStorage.getItem("customerName");
  items=new Array();
  constructor(private api:AuthService,private router:Router,private title:Title){}
  ngOnInit(): void {
    this.title.setTitle("History");
    this.getOrders()
  }

  getOrders() {
    this.api.getOrderList()
      .subscribe({
        next: (res) => {
          const vendor = res.find((a: any) => {
            if (a.customerEmail === sessionStorage.getItem('customerEmail')) {
              this.items.push(a);
            }
            console.log(this.items);
          })
        }
      })
  }
  cancelOrder(data:any){
    this.api.deleteOrder(data.placeId)
    .subscribe(res=>{
      setTimeout(function(){
        window.location.reload();
     }, 1500);
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
