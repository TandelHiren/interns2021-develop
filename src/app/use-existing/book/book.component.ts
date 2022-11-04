import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Book } from '../book';
import { LaptopService } from '../laptop.service';
import { preferredBooksFactory, PREFERRED_BOOKS } from '../refferd-book';

const book = new Book('lerarning angular','angular.io');
// export const helloMessage = new InjectionToken<any>('hello');

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers:[
    LaptopService,
    {
      provide:Book,
      useValue:book
    },
    {
      provide: PREFERRED_BOOKS,
      useFactory:preferredBooksFactory(3),
      deps:[Book, LaptopService]
      
    }
    // {
    //   provide:  helloMessage,
    //   useValue:'hello Team..!!!'
    // }
  ]
})
export class BookComponent implements OnInit {

  constructor(
    private book:Book,
    @Inject(PREFERRED_BOOKS) private pBooks: any
  ) { }

  ngOnInit() {
  }

}
