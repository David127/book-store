import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductListComponent } from '@/components/product-list/product-list.component';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '@/services/store.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FindProductPipe } from '@/pipes/find-product.pipe';
import { Cart } from '@/models/book.interfaces';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';


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
        MatFormFieldModule,
        MatInputModule,
        AsyncPipe,
        FindProductPipe,
        FormsModule,
        RouterModule
    ]
})
export class HomePageComponent implements OnInit {

    storeService = inject(StoreService);

    @ViewChild(MatDrawer) drawer: MatDrawer | undefined;
    myCart$ = this.storeService.myCart$;
    books$ = this.storeService.books$;

    searchTerm = '';

    ngOnInit(): void {
        this.getBooks();
    }

    private getBooks() {
        this.storeService.getBooks()
        .subscribe((response) => {
            const books = response.data;
            this.storeService.updateBooks(books);
        });
    }

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

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        const term = filterValue.toLowerCase();
        const filteredProducts = this.books.filter(
            product =>
                product.isbn.toLowerCase().includes(term) ||
                product.name.toLowerCase().includes(term)
        );
        const { length } = filteredProducts;

        if (Boolean(term) && !Boolean(length)) {
            this.books$ = of([]);
        }
        if (!Boolean(term) && Boolean(length)) {
            this.books$ = this.storeService.books$;
        }
        if (Boolean(term) && Boolean(length)) {
            this.books$ = of(filteredProducts);
        }
    }

    deleteItem(id: number) {
        this.storeService.deleteItem(id);
    }

    get books() {
        return this.storeService.booksBs.getValue();
    }

}
