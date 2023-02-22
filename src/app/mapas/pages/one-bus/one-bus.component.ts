import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { OneBusDataService } from 'src/app/services/one-bus-data.service';

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
  // center: [number, number] = [ -92.96116618663339, 17.9899306057385 ];
  center: [number, number] = [ -6.25365, 53.349731 ];

  public data: any[] = [];

  constructor(
    private _oneBusDataService: OneBusDataService
  ) { }

  ngAfterViewInit(): void {

    this._oneBusDataService.getDataFromCsvFile().subscribe(
      result => {
        let csvToRowArray = result.split("\n");
          // for (let index = 1; index < csvToRowArray.length - 1; index++) {
        for (let index = 1; index < 10; index++) {
          let row = csvToRowArray[index].split(",");
          this.data.push(
            {
              dataEntryID: row[0],
              date: row[1],
              time: row[2],
              latitude: row[3],
              longitude: row[4],
              vehicleID: row[5],
            }
          );
        }

        console.log('DATAAA -->', this.data);

        for (let item of this.data) {
          console.log('ITEM ---> ', item);
          

        }

        // https://es.stackoverflow.com/questions/383466/imprimir-array-cada-tiempo-determinado
      }
    );

    


    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa);

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

    this.setMarkers();
  }

  setMarkers() {
    for (let item of this.data) {
      console.log('ITEM ---> ', item);
    }
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
