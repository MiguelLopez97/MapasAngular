import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    { ruta: '/mapas/one_bus', nombre: 'One Bus' },
    { ruta: '/mapas/many_bus', nombre: 'Many Bus' }
  ];

}
