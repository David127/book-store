import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Book, Cart } from '@/models/book.interfaces';
import { StoreService } from '@/services/store.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: true,
    imports: [ CommonModule, MatCardModule, MatButtonModule, MatIconModule ]
})
export class ProductCardComponent {

    storeService = inject(StoreService);

    @Input() book: Book = {
        id: 0,
        isbn: '',
        name: '',
        stock: 0,
        currentPrice: 0,
        image: ''
    }

    addBookToCart({ id }: Book) {
        this.storeService.addBook(id);
    }

    getQuantityByIdBook(book: Book) {
        const myCart: Cart[] = this.storeService.myCart.getValue();
        const cartItem = myCart.find(({ idBook }) => idBook === book.id);
        if (cartItem) {
            return book.stock <= cartItem.cantidad ? true : false;
        }
        return false;
    }
    
}
