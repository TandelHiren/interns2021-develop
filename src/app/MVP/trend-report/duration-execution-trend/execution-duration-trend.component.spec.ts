import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionDurationTrendComponent } from './execution-duration-trend.component';

describe('ExecutionDurationTrendComponent', () => {
  let component: ExecutionDurationTrendComponent;
  let fixture: ComponentFixture<ExecutionDurationTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionDurationTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionDurationTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
