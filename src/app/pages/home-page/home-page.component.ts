import { Component, inject, ViewChild } from '@angular/core';
import { ProductListComponent } from '@/components/product-list/product-list.component';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoreService } from '@/services/store.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FindProductPipe } from '@/pipes/find-product.pipe';
import { Cart } from '@/models/book.interfaces';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ProductListComponent,
        HeaderComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        AsyncPipe,
        FindProductPipe
    ]
})
export class HomePageComponent {

    storeService = inject(StoreService);

    @ViewChild(MatDrawer) drawer: MatDrawer | undefined;
    myCart$ = this.storeService.myCart$;
    books$ = this.storeService.books$;

    onToggleCart() {
        this.drawer?.toggle();
    }

    addOne(id: number) {
        this.storeService.addBook(id);
    }

    removeOne(id: number) {
        this.storeService.removeBook(id);
    }

    getTotal(carts: Cart[]) {

        const total = carts.reduce((accumulator: number, currentValue: Cart) => {
            const bookFound = this.books.find(({ id }) => id === currentValue.idBook);
            if (bookFound) {
                return accumulator + (bookFound.currentPrice * currentValue.cantidad);
            }
            return accumulator;
        }, 0);
        
        return total.toFixed(2);
    }

    get books() {
        return this.storeService.booksBs.getValue();
    }

}
