import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TypeDocument } from '@/enums/document.enum';
import { StoreService } from '@/services/store.service';
import { BookItemDTO, CheckoutDTO } from '@/models/checkout.interfaces';
import { Cart } from '@/models/book.interfaces';
import { SpinnerService } from '@/services/spinner.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  typeDocument = TypeDocument;

  tipoDocs: { name: string, value: number }[] = [
    { name: 'DNI', value: TypeDocument.DNI },
    { name: 'RUC', value: TypeDocument.RUC },
    { name: 'CE', value: TypeDocument.CE }
  ];
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  storeService = inject(StoreService);
  matSnackBar = inject(MatSnackBar);
  spinnerService = inject(SpinnerService);

  form: FormGroup = this.formBuilder.group({
    tipoDoc: ['', Validators.required],
    doc: [{ value: '', disabled: true }, [Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[\w\._]{5,30}\+?[\w]{0,10}@[^\d][\w\.\-]{3,}\.\w{2,5}$/)]]
  });

  onSelectionChange(event: MatSelectChange) {
    const { value } = event;
    let pattern: RegExp;

    switch (value) {
      case TypeDocument.DNI:
        pattern = /^\d{8}$/;
        break;
      case TypeDocument.RUC:
        pattern = /^\d{11}$/;
        break;
      case TypeDocument.CE:
        pattern = /^\d{20}$/;
        break;
      default:
        pattern = /^\d{8}$/;
        break;
    }

    if (this.docField?.disabled) {
      this.docField?.enable();
    }
    this.docField?.setValidators([Validators.required, Validators.pattern(pattern)]);
    this.docField?.updateValueAndValidity();
  }

  checkout(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const booksItem: Cart[] = this.storeService.myCart.getValue();
      const books: BookItemDTO[] = booksItem.map(item => {
        return {
          book_id: item.idBook,
          quantity: item.cantidad
        }
      });
      const dto: CheckoutDTO = {
        doc_number: this.docField?.value,
        doc_type: this.tipoDocField?.value,
        first_name: this.firstNameField?.value,
        last_name: this.lastNameField?.value,
        phone: this.phoneField?.value,
        email: this.emailField?.value,
        books,
      }

      this.spinnerService.show();
      this.storeService.checkout(dto)
      .subscribe(response => {
        this.storeService.emptyCart();
        this.spinnerService.hide();
        this.router.navigate(['/home']).then(() => {
          this.matSnackBar.open(`Tu orden Nᵒ${response.data.order_id} fue realizada con éxito`, '🚀', { duration: 5000 });
        })
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get tipoDocField() {
    return this.form.get('tipoDoc');
  }

  get docField() {
    return this.form.get('doc');
  }

  get firstNameField() {
    return this.form.get('firstName');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get emailField() {
    return this.form.get('email');
  }
  
}
