import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { StoreService } from '@/services/store.service';
import { Cart } from '@/models/book.interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scanner-qr',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, NgxScannerQrcodeModule],
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss']
})
export class ScannerQrComponent {

  matSnackBar = inject(MatSnackBar);
  storeService = inject(StoreService);

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    }
  };

  handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    const { value } = e[0];
    const books = this.storeService.booksBs.getValue();
    const bookFound = books.find(({ isbn }) => isbn === value);
    const cart: Cart[] = this.storeService.myCart.getValue();
    if (bookFound) {
      const exists = cart.some(({ idBook }) => idBook === bookFound.id);
      if (!exists) {
        this.storeService.addBook(bookFound.id);
      }
      this.matSnackBar.open(`El libro ${bookFound.isbn} ya esta en el carrito`, '✅', { duration: 5000 });
      
    } else {
      this.matSnackBar.open('Libro no existente', '❌', { duration: 5000 });
    }
  }

}
