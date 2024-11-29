export interface CheckoutDTO {
  doc_number: string;
  doc_type: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  books: BookItemDTO[];
}

export interface BookItemDTO {
  book_id: number;
  quantity: number;
}

export interface Checkout {
  client_id: number;
  total: number;
  doc_type: number;
  doc_number: string;
  order_id: number;
}