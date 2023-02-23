import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManyBusComponent } from './pages/many-bus/many-bus.component';
import { OneBusComponent } from './pages/one-bus/one-bus.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'one_bus', component: OneBusComponent },
      { path: 'many_bus', component: ManyBusComponent },
      // { path: '**', redirectTo: 'one_bus' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
