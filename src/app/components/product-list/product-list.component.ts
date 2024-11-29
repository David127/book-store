import { Book } from '@/models/book.interfaces';
import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '@/components/product-card/product-card.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: true,
    imports: [ ProductCardComponent, NgFor ]
})
export class ProductListComponent {

    @Input() books: Book[] = [];

}
