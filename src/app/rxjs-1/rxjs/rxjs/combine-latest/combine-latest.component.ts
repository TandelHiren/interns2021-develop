import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { take, map, withLatestFrom } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit {
// sources
nameSource=['Hiren', 'Gaurang', '1Rivet'];
colorSource=['red', 'green','blue'];
// Template ref

@ViewChild('name',{static:false}) public name:ElementRef;
@ViewChild('color',{static:false}) public color:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // const nameObservables = fromEvent<any>(this.name.nativeElement,'change').pipe(map(event=> event.target.value));
    // const colorObservables= fromEvent<any>(this.color.nativeElement,'change').pipe(
    //      map(event=> event.target.value));    

  const nameObs=  fromEvent<any>(this.name.nativeElement,'change').pipe(
     map(event=> event.target.value));
     const colorObs= fromEvent<any>(this.color.nativeElement,'change').pipe(
     map(event=> event.target.value));

  //    // ex-01 combineLatest
     combineLatest(nameObs,colorObs).subscribe(([name, color])=>{
       console.log('combineLatest',name,color);
      //  this. creteBox(name, color,'elContainer');
     })
     // ex-02
   //master: name
   //slave : color
   nameObs.pipe(withLatestFrom(colorObs)).subscribe(([name, color])=>{
    console.log('withLatestFrom--->',name,color);
   //  this. creteBox(name, color,'elContainer');
  })
  }

//   creteBox(name, color,containerId){
// let el = document.createElement('div');
// el.innerText = name;
// el.setAttribute('class', color);
// document.getElementById(containerId).appendChild(el);
//   }

}
