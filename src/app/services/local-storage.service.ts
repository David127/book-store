import { LocalStorage } from '@/enums/local-storage.enum';
import { Cart } from '@/models/book.interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getData() {
    return localStorage.getItem(LocalStorage.Cart);
  }

  save(cart: Cart[]) {
    localStorage.setItem(LocalStorage.Cart, JSON.stringify(cart));
  }

}
