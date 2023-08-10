import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  itemCreate=['proyecto','solicitante','usuario']
  itemList=['proyectos','solicitantes','usuarios']
  activeNav=false
}
