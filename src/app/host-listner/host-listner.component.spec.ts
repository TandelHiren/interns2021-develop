import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListnerComponent } from './host-listner.component';

describe('HostListnerComponent', () => {
  let component: HostListnerComponent;
  let fixture: ComponentFixture<HostListnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostListnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
