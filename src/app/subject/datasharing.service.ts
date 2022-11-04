import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, AsyncSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // SharingData = new Subject(); 
  SharingData = new AsyncSubject(); 
  constructor() { }
}
