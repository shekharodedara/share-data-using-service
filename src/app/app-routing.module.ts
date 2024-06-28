import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'comp-a', pathMatch: 'full' },
  {
    path: 'comp-a',
    loadChildren: () =>
      import('./comp-a/comp-a.module').then((m) => m.CompAModule),
  },
  {
    path: 'comp-b',
    loadChildren: () =>
      import('./comp-b/comp-b.module').then((m) => m.CompBModule),
  },
  {
    path: 'closing-time-calculator',
    loadChildren: () =>
      import('./closing-time-calculator/closing-time-calculator.module').then((m) => m.ClosingTimeCalculatorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
