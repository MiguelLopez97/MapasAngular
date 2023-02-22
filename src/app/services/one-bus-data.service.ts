import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OneBusDataService {

  public dataArray: any[] = [];

  constructor(
    private _http: HttpClient
  ) {
    this.getDataFromCsvFile();
  }

  getDataFromCsvFile():Observable<any> {

    return this._http.get('assets/csv/one_bus.csv', { responseType: 'text' });
  }

  //   return this._http.get('assets/csv/one_bus.csv', { responseType: 'text' }).subscribe(
  //     data => {
  //       let csvToRowArray = data.split("\n");
  //         // for (let index = 1; index < csvToRowArray.length - 1; index++) {
  //         for (let index = 1; index < 10; index++) {
  //           let row = csvToRowArray[index].split(",");
  //           this.dataArray.push(
  //             {
  //               dataEntryID: row[0],
  //               date: row[1],
  //               time: row[2],
  //               Latitude: row[3],
  //               Longitude: row[4],
  //               VehicleID: row[5],
  //             }
  //           );
  //         }

  //         // console.log(this.dataArray);
  //     }
  //   );
  // }
}
