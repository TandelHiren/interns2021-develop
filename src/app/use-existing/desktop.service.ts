import { Injectable } from '@angular/core';
import { Computer } from './computer';

@Injectable()
export class DesktopService implements Computer{

  constructor() { }
  
  getComputerName() {
    return 'Desktop'
  }
}
