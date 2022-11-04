import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../datasharing.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component {
  Component1Data: any = '';

  constructor(private DataSharing: DataSharingService) {
    // this.DataSharing.SharingData.subscribe((res: any) => {  
    //   this.Component1Data = res;  
    // })  
    this.DataSharing.SharingData.subscribe((res: any) => {
      this.Component1Data = res;
    })
  }

  onSubmit(data) {
    this.DataSharing.SharingData.next(data.value);
  }

}
