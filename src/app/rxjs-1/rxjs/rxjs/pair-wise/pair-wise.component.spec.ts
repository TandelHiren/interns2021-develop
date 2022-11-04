import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairWiseComponent } from './pair-wise.component';

describe('PairWiseComponent', () => {
  let component: PairWiseComponent;
  let fixture: ComponentFixture<PairWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
