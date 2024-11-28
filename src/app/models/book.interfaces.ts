export interface Book {
  id:           number;
  isbn:         string;
  name:         string;
  stock:        number;
  currentPrice: number;
  image:        string;
}

export interface Cart {
  idBook:       number;
  cantidad:     number;
}