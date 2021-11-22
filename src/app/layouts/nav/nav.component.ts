import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeNav = false;

  onClick() {
    this.activeNav = !this.activeNav;
  }

  onCloseNav() {
    this.activeNav = false;
  }
}
