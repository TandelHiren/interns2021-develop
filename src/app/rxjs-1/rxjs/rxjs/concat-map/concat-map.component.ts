import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { of, from } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { mergeAll } from 'rxjs/internal/operators/mergeAll';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { concatAll, concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {
  constructor(private utilityService: UtilityService) { }

  getData(data) {
    return of(data + ' video Uploaded').pipe(delay(2000))
  }

  ngOnInit() {
    const source = from(['tech', 'comedy', 'news']);

    // source.subscribe((res) =>{
    //   console.log('merge map',res);

    // })
    // // Ex -01 Map
    source.pipe(map(data => this.getData(data)))
      .subscribe(res => res.subscribe((res)=>{
        this.utilityService.print(res, 'elContainer'); 
      })
      )

    // Ex -02 Map + ConcatAll
    source.pipe(map(data => this.getData(data)),
      concatAll()).subscribe((res) => {
        this.utilityService.print(res, 'elContainer2')
      })
    // // // Ex -03 concatMap
    source.pipe(concatMap(data => this.getData(data))
    )
      .subscribe((res) => {
        this.utilityService.print(res, 'elContainer3')
      })
  }

}
