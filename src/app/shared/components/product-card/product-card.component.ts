import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '@/models/book.interfaces';
import { StoreService } from '@/services/store.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: true,
    imports: [ MatCardModule, MatButtonModule ]
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

    hasMoreThanOne() {
        
    }
}
