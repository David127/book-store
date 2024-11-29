import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '@/services/store.service';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Cart } from '@/models/book.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatButtonModule, AsyncPipe]
})
export class HeaderComponent {

  @Output() toggleCart = new EventEmitter();
  myCart$ = this.store.myCart$;

  constructor(
    private store: StoreService
  ) { }

  ngOnInit(): void {
  }

  handleClickCart() {
    this.toggleCart.emit();
  }

  getCartLength(items: Cart[]) {
    const cartLength = items.reduce((accumulator: number, initialValue: Cart) => accumulator + initialValue.cantidad, 0);
    return cartLength;
  }

}
