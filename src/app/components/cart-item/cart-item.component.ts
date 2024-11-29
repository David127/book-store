import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, Cart } from '@/models/book.interfaces';
import { StoreService } from '@/services/store.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  storeService = inject(StoreService);

  @Input() book: Book = {
    id: 0,
    isbn: '',
    name: '',
    stock: 0,
    currentPrice: 0,
    image: ''
  }

  @Input() cart: Cart = {
    idBook: 0,
    cantidad: 0
  }

  addOne(id: number) {
    this.storeService.addBook(id);
  }

  removeOne(id: number) {
    this.storeService.removeBook(id);
  }

  deleteItem(id: number) {
    this.storeService.deleteItem(id);
  }

}
