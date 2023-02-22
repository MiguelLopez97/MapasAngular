import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { AutobusesDataService } from 'src/app/services/autobuses-data.service';
import { AutobusModel } from 'src/app/models/autobus.model';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-many-bus',
  templateUrl: './many-bus.component.html',
  styleUrls: ['./many-bus.component.css']
})
export class ManyBusComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -6.25365, 53.349731 ];

  public dataAutobuses: AutobusModel[] = [];

  public autobus43073: AutobusModel[] = [];
  public autobus38087: AutobusModel[] = [];
  public autobus40037: AutobusModel[] = [];
  public autobus38065: AutobusModel[] = [];
  public autobus33485: AutobusModel[] = [];

  public autobuses = [
    { nombre: 'Autobús 43073', array: this.autobus43073, classColor: 'primary' },
    { nombre: 'Autobús 38087', array: this.autobus38087, classColor: 'warning' },
    { nombre: 'Autobús 40037', array: this.autobus40037, classColor: 'success' },
    { nombre: 'Autobús 38065', array: this.autobus38065, classColor: 'info' },
    { nombre: 'Autobús 33485', array: this.autobus33485, classColor: 'danger' },
  ];

  public currentMarkers: mapboxgl.Marker[] = [];

  public currentTimeout!: any;

  constructor(
    private _autobusesDataService: AutobusesDataService
  ) { }

  ngAfterViewInit(): void {

    this.getManyBusData();
    
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

  getManyBusData() {
    this._autobusesDataService.getManyBusDataCsvFile().subscribe(
      result => {
        let csvToRowArray = result.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
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

        //Separación de registros por cada vehicleID
        this.autobus43073 = this.dataAutobuses.filter(autobus => autobus.vehicleID == '43073');
        this.autobus38087 = this.dataAutobuses.filter(autobus => autobus.vehicleID == '38087');
        this.autobus40037 = this.dataAutobuses.filter(autobus => autobus.vehicleID == '40037');
        this.autobus38065 = this.dataAutobuses.filter(autobus => autobus.vehicleID == '38065');
        this.autobus33485 = this.dataAutobuses.filter(autobus => autobus.vehicleID == '33485');

        this.autobuses[0].array = this.autobus43073
        this.autobuses[1].array = this.autobus38087
        this.autobuses[2].array = this.autobus40037
        this.autobuses[3].array = this.autobus38065
        this.autobuses[4].array = this.autobus33485
        
      }
    );
  }

  setAutobusOnMap(array: AutobusModel[], classColor: string) {

    this.deleteCurrentMarkers();
    // clearTimeout(this.currentTimeout);
    
    array.forEach((element, index) => {

      const longitudLatitud: mapboxgl.LngLatLike = [ element.longitude, element.latitude ];
      const markerCar: HTMLElement = document.createElement('div');
      markerCar.innerHTML = `<i class="fa-solid fa-car fs-3 text-${classColor}"></i>`;

      this.currentTimeout = setTimeout(() => {

        const marker = new mapboxgl.Marker({element: markerCar}).setLngLat(longitudLatitud).addTo(this.mapa);

        //Guardamos los marcadores temporales en el arreglo 'currentMarkers'
        this.currentMarkers.push(marker);

        this.mapa.flyTo({
          center: longitudLatitud
        });
      }, index * 3000);

      //TODO: Detener el setTimeOut cuando se seleccione otro autobus
      //https://stackoverflow.com/questions/25311892/cleartimeout-for-settimeout-in-for-loop
    });

    

  }

  deleteCurrentMarkers() {
    //Eliminar markers 
    if (this.currentMarkers.length!==null) {
      for (let i = this.currentMarkers.length - 1; i >= 0; i--) {
        this.currentMarkers[i].remove();
      }
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
