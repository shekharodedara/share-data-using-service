import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosingTimeCalculatorComponent } from './closing-time-calculator.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClosingTimeCalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ClosingTimeCalculatorComponent },
    ]),
  ],
})
export class ClosingTimeCalculatorModule {}
