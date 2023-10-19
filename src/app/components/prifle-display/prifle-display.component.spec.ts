import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrifleDisplayComponent } from './prifle-display.component';

describe('PrifleDisplayComponent', () => {
  let component: PrifleDisplayComponent;
  let fixture: ComponentFixture<PrifleDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrifleDisplayComponent]
    });
    fixture = TestBed.createComponent(PrifleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
