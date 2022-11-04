import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subject$ = new ReplaySubject();

  ngOnInit() {
    this.subject$.next("1");
    this.subject$.next("2");

    this.subject$.subscribe(
      val => console.log("Sub1 " + val),
      err => console.error("Sub1 " + err),
      () => console.log("Sub1 Complete")
    );

    this.subject$.next("3");
    this.subject$.next("4");

    this.subject$.subscribe(val => {
      console.log("sub2 " + val);
    });

    this.subject$.next("5");
    this.subject$.complete();
    this.subject$.error("err");

    this.subject$.next("6");

    this.subject$.subscribe(
      val => {
        console.log("sub3 " + val);
      },
      err => console.error("sub3 " + err),
      () => console.log("Complete")
    );
  }

}
