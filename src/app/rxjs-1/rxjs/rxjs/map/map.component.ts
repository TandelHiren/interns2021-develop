import { Component, OnInit } from '@angular/core';
import { interval, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  //subscription
  sub1: Subscription;
  sub2: Subscription;
  // message
  message1: any
  message2: any;

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {

    const broadCastVideos = interval(1000);

    //---------------------------ex-01------------------------------//
      // this.sub1 = broadCastVideos.subscribe((res) => {
      //   console.log('video' + res); // not use
      // })

      // setTimeout(() => {
      //   this.sub1.unsubscribe();
      // }, 10000);
    // } //not in use
    this.sub1 = broadCastVideos.pipe(
      map(data => 'video' + data)
    ).subscribe((res) => {
      //console.log(res); // not use
      this.message1 = res;
    })

    setTimeout(() => {
      this.sub1.unsubscribe();
    }, 10000);

    //---------------------------ex-02------------------------------//

    this.sub2 = broadCastVideos.pipe(
      map(data => data * 10)
    ).
      subscribe((res) => {
       this.message2 = res;
      })
    setTimeout(() => {
      this.sub2.unsubscribe();
    }, 10000);

    //---------------------------ex-03------------------------------//

    const peoples = from([
      { id: 1, name: 'Ankit', age: 25 },
      { id: 2, name: 'Darpan', age: 25 },
      { id: 3, name: 'Vishal', age: 25 },
      { id: 4, name: 'Kiran', age: 25 },
      { id: 5, name: 'Nidhi', age: 25 },
    ])

    peoples.pipe(map(data =>data.name + data.age)).
    subscribe((res) => {
    
this.utilityService.print(res,'elContainer');
    })
    const members= from([
      { id: 1, name: 'Ankit', age: 25 },
      { id: 2, name: 'Darpan', age: 25 },
      { id: 3, name: 'Vishal', age: 25 },
      { id: 4, name: 'Kiran', age: 25 },
      { id: 5, name: 'Nidhi', age: 25 },
    ])

    members.pipe(map(data => data.name))
    .subscribe((res)=>{
      // console.log(res);
      this.utilityService.print(res,'elContainer')
    })
  }




}
