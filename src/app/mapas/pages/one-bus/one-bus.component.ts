import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { AutobusesDataService } from 'src/app/services/autobuses-data.service';
import { AutobusModel } from 'src/app/models/autobus.model';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-one-bus',
  templateUrl: './one-bus.component.html',
  styleUrls: ['./one-bus.component.css']
})
export class OneBusComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -6.25365, 53.349731 ];

  public dataAutobuses: AutobusModel[] = [];

  constructor(
    private _autobusesDataService: AutobusesDataService
  ) { }

  ngAfterViewInit(): void {

    this.getOneBusData();

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomstart', (event) => {
      if (this.mapa.getZoom() < 15) {
        this.mapa.zoomTo(15)
      }
    });

    this.mapa.on('zoomend', (event) => {
      if (this.mapa.getZoom() > 16) {
        this.mapa.zoomTo(16)
      }
    });

    //Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];
    });
  }

  getOneBusData() {
    this._autobusesDataService.getOneBusDataCsvFile().subscribe(
      result => {
        let csvToRowArray = result.split("\n");
          // for (let index = 1; index < csvToRowArray.length - 1; index++) {
        for (let index = 1; index < 20; index++) {
          let row = csvToRowArray[index].split(",");
          this.dataAutobuses.push(
            {
              dataEntryID: row[0],
              date: row[1],
              time: row[2],
              latitude: row[3],
              longitude: row[4],
              vehicleID: row[5].replace("\r", ""),
            }
          );
        }

        this.dataAutobuses.forEach((element, index) => {
          const longitudLatitud: mapboxgl.LngLatLike = [ element.longitude, element.latitude ];
          const markerCar: HTMLElement = document.createElement('div');
          markerCar.innerHTML = '<i class="fa-solid fa-car fs-3 text-primary"></i>';

          setTimeout(() => {

            const marker = new mapboxgl.Marker({element: markerCar}).setLngLat(longitudLatitud).addTo(this.mapa);

            this.mapa.flyTo({
              center: longitudLatitud
            });
          }, index * 3000);
        });
      }
    );
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  ngOnDestroy(): void {
    this.mapa.off('move', () => {});
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('zoomstart', () => {});
  }

}
