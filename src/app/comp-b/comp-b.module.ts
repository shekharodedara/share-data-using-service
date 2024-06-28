import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompBComponent } from './comp-b.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CompBComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CompBComponent}])
  ]
})
export class CompBModule { }
