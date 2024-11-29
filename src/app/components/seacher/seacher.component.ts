import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '@/services/store.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seacher',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './seacher.component.html',
  styleUrls: ['./seacher.component.scss']
})
export class SeacherComponent {

  storeService = inject(StoreService);
  searchTerm = '';

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const term = filterValue.toLowerCase();
    this.searchTerm = term;
    const filteredProducts = this.storeService.booksOriginal.filter(
      product =>
        product.isbn.toLowerCase().includes(term) ||
        product.name.toLowerCase().includes(term)
    );
    const { length } = filteredProducts;

    if (Boolean(term) && !Boolean(length)) {
      this.storeService.updateBooks([]);
    }
    if (!Boolean(term) && Boolean(length)) {
      const booksOriginal = this.storeService.booksOriginal;
      this.storeService.updateBooks(booksOriginal);
    }
    if (Boolean(term) && Boolean(length)) {
      this.storeService.updateBooks(filteredProducts);
    }
  }

  resetFilter() {
    this.searchTerm = '';
    const booksOriginal = this.storeService.booksOriginal;
    this.storeService.updateBooks(booksOriginal);
  }

}
