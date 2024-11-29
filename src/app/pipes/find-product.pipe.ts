import { Book } from '@/models/book.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findProduct',
  standalone: true
})
export class FindProductPipe implements PipeTransform {

  transform(idBook: number, books: Book[]): Book | null | undefined {
    if (!books || !idBook) {
      return null;
    }
    return books.find(({ id }) => id === idBook);
  }

}
