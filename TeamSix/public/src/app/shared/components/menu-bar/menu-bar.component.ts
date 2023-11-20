import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MenuBarItem } from './menu-bar.interfaces';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  @Input() title: string = '';
  @Input() menuBarItems: MenuBarItem[] = [];

  routerHome() {
    this.router.navigateByUrl('');
  }

  routeTo(routeLink: string) {
    console.log('routeTo', routeLink);
    this.router.navigate([routeLink], { relativeTo: this.activatedRoute });
  }
}
