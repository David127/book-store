import { StoreService } from '@/services/store.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: true,
    imports: [ ProductCardComponent, NgFor, AsyncPipe ]
})
export class ProductListComponent {

    storeService = inject(StoreService);
    books$ = this.storeService.books$;

}
