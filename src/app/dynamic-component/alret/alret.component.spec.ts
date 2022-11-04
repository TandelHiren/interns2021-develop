import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlretComponent } from './alret.component';

describe('AlretComponent', () => {
  let component: AlretComponent;
  let fixture: ComponentFixture<AlretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
