import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  getData(data) {
    return of(data + ' video Uploaded')
  }
  ngOnInit() {
    const source = from(['tech', 'comedy', 'news']);

    // source.subscribe((res) =>{
    //   console.log('merge map',res);

    // })
    // Ex -01 Map
    source.pipe(map(data => this.getData(data)))
      .subscribe(res => {
        this.utilityService.print(res, 'elContainer');
      })
      //   res.subscribe((res)=>{
      //   this.utilityService.print(res, 'elContainer');
        
      // })

      // )

    // Ex -02 Map + merge all
    source.pipe(map(data => this.getData(data)),
      mergeAll()).subscribe((res) => {
        this.utilityService.print(res, 'elContainer2')
      })
    // // Ex -03 merge map
    source.pipe(mergeMap(data => this.getData(data))
    )
      .subscribe((res) => {
        this.utilityService.print(res, 'elContainer3')
      })

  }


}
