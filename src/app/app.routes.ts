import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { checkoutGuard } from "./guards/checkout.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [ checkoutGuard ]
  }
];