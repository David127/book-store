import { Book, Cart } from '@/models/book.interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myList: Cart[] = [];
  private myCart = new BehaviorSubject<Cart[]>([]);
  myCart$ = this.myCart.asObservable();

  booksBs = new BehaviorSubject<Book[]>([
    {
      id: 1,
      isbn: '2394283',
      name: 'Primer libro',
      stock: 10,
      currentPrice: 12.0,
      image: 'https://m.media-amazon.com/images/I/71ODaT072wL._SL1500_.jpg'
    },
    {
      id: 2,
      isbn: '969284',
      name: 'Segundo Libro',
      stock: 10,
      currentPrice: 34.4,
      image: 'https://m.media-amazon.com/images/I/517MwXYNucL._SY445_SX342_.jpg'
    },
    {
      id: 3,
      isbn: '847934',
      name: 'Tercer Libro',
      stock: 10,
      currentPrice: 24.0,
      image: 'https://m.media-amazon.com/images/I/91GK2UcpNmL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
      id: 4,
      isbn: '56456',
      name: 'Cuarto Libro',
      stock: 6,
      currentPrice: 64.2,
      image: 'https://m.media-amazon.com/images/I/612G+UBkh2L._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
      id: 5,
      isbn: '733646',
      name: 'Quinto Libro',
      stock: 4,
      currentPrice: 83,
      image: 'https://m.media-amazon.com/images/I/81IhZCKJFYL._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
      id: 6,
      isbn: '47536',
      name: 'Sexto Libro',
      stock: 7,
      currentPrice: 43,
      image: 'https://m.media-amazon.com/images/I/81gnLtfSK1L._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
      id: 7,
      isbn: '67523',
      name: 'Septimo Libro',
      stock: 5,
      currentPrice: 14,
      image: 'https://m.media-amazon.com/images/I/81WRA-Jl1jL._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
      id: 8,
      isbn: '74437',
      name: 'Octavo Libro',
      stock: 5,
      currentPrice: 12,
      image: 'https://m.media-amazon.com/images/I/81eNsQHsG0L._AC_UL640_FMwebp_QL65_.jpg'
    }
  ]);
  books$ = this.booksBs.asObservable();

  constructor() { }

  addBook(id: number) {
    const index = this.myList.findIndex(({ idBook }) => idBook === id);
    if (index >= 0) {
      this.myList[index].cantidad++;
    } else {
      this.myList.push({ idBook: id, cantidad: 1 });
    }
    this.myCart.next(this.myList);
  }

  removeBook(id: number) {
    const index = this.myList.findIndex(({ idBook }) => idBook === id);
    //debugger
    if (index >= 0) {
      const { cantidad } = this.myList[index];
      if (cantidad === 1) {
        this.myList.splice(index, 1);
      } else {
        this.myList[index].cantidad--;
      }
      this.myCart.next(this.myList);
    }
  }
}
