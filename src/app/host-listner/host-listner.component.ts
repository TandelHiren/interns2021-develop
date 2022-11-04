import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-host-listner',
  templateUrl: './host-listner.component.html',
  styleUrls: ['./host-listner.component.scss']
})
export class HostListnerComponent implements OnInit {
  scrollValue = 0;
  clickedValue: string;
  //try
  private isClicked = false;
  public style = {};
  @HostListener('document:mousewheel', ['$event'])
  onDocumentMousewheelEvent(event) {
    debugger
    this.scrollValue = this.scrollValue + 1;
  }

  @HostListener('document:click', ['$event'])
  onClickEvent(event: MouseEvent) {
    debugger
    var target = event.target || event.srcElement;
    var id = target['id']
    this.clickedValue = id;
  }
// try
  // public ngDoCheck(){
  //   console.count('change detection');
  // }

  // @HostListener('mousedown', ['$event.target'])
  // onMouseDown(btn) {
  //   this.isClicked = true;
  // }

  // @HostListener('mouseup', ['$event.target'])
  // onMouseUp(btn) {
  //   this.isClicked = false;
  // }

  //  @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event) {
  //   if(!this.isClicked){
  //     return;
  //   }
  //   this.style = {left: `${event.clientX}px`, top: `${event.clientY}px`}
  // }
  constructor() { }

  ngOnInit() {
  }

}
