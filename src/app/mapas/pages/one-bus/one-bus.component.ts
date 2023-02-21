import { AfterViewInit, Component, OnInit } from '@angular/core';

import { OneBusDataService } from 'src/app/services/one-bus-data.service';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-one-bus',
  templateUrl: './one-bus.component.html',
  styleUrls: ['./one-bus.component.css']
})
export class OneBusComponent implements AfterViewInit {

  public data: any[] = [];

  constructor(
    private _oneBusDataService: OneBusDataService
  ) { }

  ngAfterViewInit(): void {

    this.data = this._oneBusDataService.dataArray;

    console.log('DATAAA -->', this.data);


    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -92.96116618663339, 17.9899306057385 ],
      zoom: 17
    });
  }

}
