import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alret',
  templateUrl: './alret.component.html',
  styleUrls: ['./alret.component.scss']
})
export class AlretComponent implements OnInit , OnDestroy{
  @Input() type: string = "success";

  @Output() onDestroy = new EventEmitter();
  constructor() { }
  

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy.emit();
  }


  darpan(){
    
  }
}
