import { Cart } from '@/models/book.interfaces';
import { StoreService } from '@/services/store.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const cartLsAsString = localStorage.getItem('Cart');
  let cartLs: Cart[] = [];
  if (cartLsAsString) {
    cartLs = JSON.parse(cartLsAsString);
  }
  const router = inject(Router);
  const storeService = inject(StoreService);
  const cartBs = storeService.myCart.getValue();

  if (cartBs.length > 0) {
    return true;
  }
  if (cartLs.length > 0) {
    storeService.updateCart(cartLs);
    return true;
  }

  router.navigate(['/home']);
  return false;
};