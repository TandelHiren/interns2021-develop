import { Injectable } from '@angular/core';
import { Book } from './book';
import { Computer } from './computer';



const BOOKS: Book[] = [
  { "name": "Head First Java", "category": "Java" },
  { "name": "Hibernate in Action", "category": "Hibernate" },
  { "name": "Thinking in Java", "category": "Java" },
  { "name": "Beginning Hibernate", "category": "Hibernate" },
  { "name": "Effective Java", "category": "Java" },
  { "name": "Learning Java", "category": "Java" },
  { "name": "Hibernate Recipes", "category": "Hibernate" },
];
@Injectable()
export class LaptopService {

  constructor() { }

  // getComputerName() {
  //   return 'Laptop';
  // }

  getAllBooks(): Book[]{
    return BOOKS
  }


}
