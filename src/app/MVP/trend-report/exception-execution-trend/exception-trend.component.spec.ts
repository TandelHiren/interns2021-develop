import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionTrendComponent } from './exception-trend.component';

describe('ExceptionTrendComponent', () => {
  let component: ExceptionTrendComponent;
  let fixture: ComponentFixture<ExceptionTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
