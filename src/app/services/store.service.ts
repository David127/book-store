import { Book, Cart } from '@/models/book.interfaces';
import { Checkout, CheckoutDTO } from '@/models/checkout.interfaces';
import { IResponse } from '@/models/response.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  http = inject(HttpClient);
  localStorageService = inject(LocalStorageService);

  private myList: Cart[] = [];
  myCart = new BehaviorSubject<Cart[]>([]);
  myCart$ = this.myCart.asObservable();
  
  booksBsOriginal = new BehaviorSubject<Book[]>([]);
  booksOriginal$ = this.booksBsOriginal.asObservable();
  booksBs = new BehaviorSubject<Book[]>([]);
  books$ = this.booksBs.asObservable();

  constructor() { }

  getBooks(): Observable<IResponse<Book[]>> {
    return this.http.get<IResponse<Book[]>>('http://localhost:8000/api/v1/books')
    .pipe(
      map(response => {
        return {
          ...response,
          data: response.data.map(book => ({
            ...book,
            currentPrice: Number(book.currentPrice)
          }))
        };
      })
    )
  }

  checkout(dto: CheckoutDTO): Observable<IResponse<Checkout>> {
    return this.http.post<IResponse<Checkout>>('http://localhost:8000/api/v1/orders/purchase', dto);
  }

  addBook(id: number) {
    const index = this.getIndex(id);
    if (index >= 0) {
      this.myList[index].cantidad++;
    } else {
      this.myList.push({ idBook: id, cantidad: 1 });
    }
    this.myCart.next(this.myList);
    this.localStorageService.save(this.myList);
  }

  removeBook(id: number) {
    const index = this.getIndex(id);
    
    if (index >= 0) {
      const { cantidad } = this.myList[index];
      if (cantidad === 1) {
        this.myList.splice(index, 1);
      } else {
        this.myList[index].cantidad--;
      }
      this.myCart.next(this.myList);
      this.localStorageService.save(this.myList);
    }
  }

  deleteItem(id: number) {
    const index = this.getIndex(id);
    this.myList.splice(index, 1);
    this.myCart.next(this.myList);
    this.localStorageService.save(this.myList);
  }

  updateCart(cart: Cart[]) {
    this.myList = cart;
    this.myCart.next(cart);
  }

  emptyCart() {
    this.myList = [];
    this.myCart.next(this.myList);
    this.localStorageService.save(this.myList);
  }

  updateBooks(books: Book[]) {
    this.booksBs.next(books);
  }

  updateBooksOriginal(book: Book[]) {
    this.booksBsOriginal.next(book);
  }

  private getIndex(id: number) {
    return this.myList.findIndex(({ idBook }) => idBook === id);
  }

  get books() {
    return this.booksBs.getValue();
  }

  get booksOriginal() {
    return this.booksBsOriginal.getValue();
  }

}
