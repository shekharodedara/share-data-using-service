import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-comp-b',
  templateUrl: './comp-b.component.html',
  styleUrl: './comp-b.component.scss'
})
export class CompBComponent {
  data: any = 'no dta from A';
  constructor(private cs: CommonService) {
    this.getData();
  }
  getData() {
    this.data = this.cs.getData();
  }
}
