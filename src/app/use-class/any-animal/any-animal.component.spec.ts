import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyAnimalComponent } from './any-animal.component';

describe('AnyAnimalComponent', () => {
  let component: AnyAnimalComponent;
  let fixture: ComponentFixture<AnyAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
