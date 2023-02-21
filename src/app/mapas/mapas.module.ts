import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { OneBusComponent } from './pages/one-bus/one-bus.component';
import { ManyBusComponent } from './pages/many-bus/many-bus.component';

@NgModule({
  declarations: [
    OneBusComponent,
    ManyBusComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
