import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingTimeCalculatorComponent } from './closing-time-calculator.component';

describe('ClosingTimeCalculatorComponent', () => {
  let component: ClosingTimeCalculatorComponent;
  let fixture: ComponentFixture<ClosingTimeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosingTimeCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClosingTimeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
