import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  commonData: any = 'default data';
  constructor() {}
  getData() {
    return this.commonData;
  }
  setData(data: any) {
    this.commonData = data;
  }
}
