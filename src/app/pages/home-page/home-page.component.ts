import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { RouterModule } from '@angular/router'
import { ScannerQrComponent } from '@/components/scanner-qr/scanner-qr.component';
import { SeacherComponent } from '@/components/seacher/seacher.component';
import { CartItemComponent } from '@/components/cart-item/cart-item.component';
import { SpinnerService } from '@/services/spinner.service';
import { LocalStorageService } from '@/services/local-storage.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ProductListComponent,
        ScannerQrComponent,
        SeacherComponent,
        CartItemComponent,
        HeaderComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        AsyncPipe,
        FindProductPipe,
        RouterModule
    ]
})
export class HomePageComponent implements OnInit {

    storeService = inject(StoreService);
    spinnerService = inject(SpinnerService);
    localStorageService = inject(LocalStorageService);

    @ViewChild(MatDrawer) drawer: MatDrawer | undefined;
    myCart$ = this.storeService.myCart$;
    books$ = this.storeService.books$;
    booksOriginal$ = this.storeService.booksOriginal$;

    constructor() {
        this.updateCart();
    }

    ngOnInit(): void {
        this.getBooks();
    }

    private updateCart() {
        const cartLsAsString = this.localStorageService.getData();
        let cartLs: Cart[] = [];
        if (cartLsAsString) {
            cartLs = JSON.parse(cartLsAsString);
            this.storeService.updateCart(cartLs);
        }
    }

    private getBooks() {
        this.spinnerService.show();
        this.storeService.getBooks()
        .subscribe((response) => {
            this.spinnerService.hide();
            const books = response.data;
            this.storeService.updateBooks(books);
            this.storeService.updateBooksOriginal(books);
        });
    }

    onToggleCart() {
        this.drawer?.toggle();
    }
    
    getTotal(carts: Cart[]) {

        const total = carts.reduce((accumulator: number, currentValue: Cart) => {
            const bookFound = this.storeService.books.find(({ id }) => id === currentValue.idBook);
            if (bookFound) {
                return accumulator + (bookFound.currentPrice * currentValue.cantidad);
            }
            return accumulator;
        }, 0);
        
        return total.toFixed(2);
    }
}
