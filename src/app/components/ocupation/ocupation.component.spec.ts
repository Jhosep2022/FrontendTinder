import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationComponent } from './ocupation.component';

describe('OcupationComponent', () => {
  let component: OcupationComponent;
  let fixture: ComponentFixture<OcupationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcupationComponent]
    });
    fixture = TestBed.createComponent(OcupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
