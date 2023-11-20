import { Component } from '@angular/core';
import { MenuBarItem } from './shared/components/menu-bar/menu-bar.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Portfolio';

  public menuItems: MenuBarItem[] = [
    {
      name: 'Portfolio',
      routePath: 'overview',
    },
    {
      name: 'PortfolioItem',
      routePath: 'portfolioItem'
    },
    {
      name: 'Summary',
      routePath: 'summary/:id/:wkn'
    },

    {
      name: 'Impressum',
      routePath: 'impressum',
    },
    {
      name: '404',
      routePath: 'somewhatever',
    },
  ];
}
