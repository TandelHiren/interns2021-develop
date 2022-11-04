import { InjectionToken } from '@angular/core';
import { Book }        from './book';
import { LaptopService } from './laptop.service';

export const PREFERRED_BOOKS = new InjectionToken<string>('book name');

export function preferredBooksFactory(count: number) {
  return (myBook: Book, bookService: LaptopService): string => {
    return bookService
        .getAllBooks()
        .filter( book => book.category === myBook.category)
        .map(book => book.name)
        .slice(0, Math.max(0, count))
	.join(' | ');
  };
}; 