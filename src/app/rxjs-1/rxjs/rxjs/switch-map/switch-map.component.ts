import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { UtilityService } from '../utility.service';
import { map } from 'rxjs/internal/operators/map';
import { switchAll } from 'rxjs/internal/operators/switchAll';
import { delay, switchMap, mergeMap, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  getData(data) {
    return of(data + ' video Uploaded').pipe(delay(1000))
  }
  ngOnInit() {
    const source = from(['tech', 'comedy', 'news']);

    


    // // Ex -01 Map
    // source.pipe(map(data => this.getData(data)))
    //   .subscribe(res => res.subscribe((res)=>{
    //     this.utilityService.print(res, 'elContainer'); 
    //   })
    //   )

    // // Ex -02 Map + SwitchAll
    // source.pipe(map(data => this.getData(data)),
    //   switchAll()).subscribe((res) => {
    //     this.utilityService.print(res, 'elContainer2')
    //   })
    // // // Ex -03 merge map
    // source.pipe(switchMap(data => this.getData(data))
    // )
    //   .subscribe((res) => {
    //     this.utilityService.print(res, 'elContainer3')
    //   })

    // difference
    // Ex -01 mergeMap
    source.pipe(mergeMap(data => this.getData(data)))
      .subscribe(res => {
        this.utilityService.print(res, 'elContainer'); 
      })

    // Ex -02 ConcatMap
    source.pipe(concatMap(data => this.getData(data))).subscribe((res) => {
        this.utilityService.print(res, 'elContainer2')
      })
    // Ex -03switch map
    source.pipe(switchMap(data => this.getData(data))
    )
      .subscribe((res) => {
        this.utilityService.print(res, 'elContainer3')
      })

  }

}
