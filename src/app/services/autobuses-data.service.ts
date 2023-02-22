import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutobusesDataService {

  constructor(
    private _http: HttpClient
  ) {
    // this.getDataFromCsvFile();
  }

  getOneBusDataCsvFile():Observable<any> {
    return this._http.get('assets/csv/one_bus.csv', { responseType: 'text' });
  }

  getManyBusDataCsvFile():Observable<any> {
    return this._http.get('assets/csv/many_bus.csv', { responseType: 'text' });
  }
}
