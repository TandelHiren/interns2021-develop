import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {
  dell={
    brand:'dell',
    hardDisk:'2TB',
    color: 'black'
  }
  hp={
    brand:'hp',
    hardDisk:'1TB',
    color: 'silver'
  }
  notAvail={
    brand:'not available',
    color:'N/A'
  }
  constructor() { }

  ngOnInit() {

    // java script
    //  buyLaptop = new Promise(function(resolve,reject){
    //   resolve('promise is resolved')
    // })
    //es6
    let buyLaptop = new Promise((resolve, reject) => {
      // resolve('promise is resolved');
      // reject('promise is reject');
      if(this.dellAvailable()){
        setTimeout(() => {
          resolve(this.dell);
          // resolve('dell is purchased');
        }, 3000);
        

      } else if(this.hpAvailable()){
        setTimeout(() => {
          // resolve('hp is purchased');
          resolve(this.hp);
        }, 3000);
       
      } else {
        setTimeout(() => {
          // reject('laptop is not available on store');
          reject(this.notAvail);
        }, 3000);
       
      }
    })
    buyLaptop.then(res => {
      console.log('then code=>', res);

    }).catch(res => {
      console.log('catch code=>', res);

    })
  }


  public dellAvailable() {

    return true;

  }
  public hpAvailable() {
    return false;

  }


}
