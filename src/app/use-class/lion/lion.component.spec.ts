import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LionComponent } from './lion.component';

describe('LionComponent', () => {
  let component: LionComponent;
  let fixture: ComponentFixture<LionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
