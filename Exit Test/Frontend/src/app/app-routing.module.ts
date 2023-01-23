import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './vendor/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { IndexComponent } from './login/index.component';
import { SignupComponent } from './signup/signup.component';
import { VendorAuthGuard } from './service/vendor-auth.guard';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { CustomerGuard } from './service/customer.guard';
const routes: Routes = [
  
    {
      path:'',
      redirectTo:'/index',
      pathMatch:'full'
    },
    {
      path:'register',
      component:SignupComponent
    },
    {
      path:'index',
      component:IndexComponent
    },
    {
      path:'admin',
      component:AdminComponent,
      canActivate:[VendorAuthGuard]
    },
    {
      path:'customer',
      component:CustomerComponent,
      canActivate:[CustomerGuard]
    },
    {
      path:'customer/cart',
      component:CartComponent,
      canActivate:[CustomerGuard]
    },
    {
      path:'customer/history',
      component:HistoryComponent,
      canActivate:[CustomerGuard]
    },
    {
      path:'admin/notification',
      component:NotificationComponent,
      canActivate:[VendorAuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
