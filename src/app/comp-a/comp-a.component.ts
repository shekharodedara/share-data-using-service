import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-comp-a',
  templateUrl: './comp-a.component.html',
  styleUrl: './comp-a.component.scss',
  // providers: [CommonService] //this will prevent data passing to comp-b
})
export class CompAComponent {
  data: any;
  constructor(public cs: CommonService) {
    this.data = cs.getData();
    cs.setData('data From comp A')
  }
}
