import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompAComponent } from './comp-a.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CompAComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CompAComponent}])
  ]
})
export class CompAModule { }
