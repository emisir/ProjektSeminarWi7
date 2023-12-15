import { Component, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { AuthCoreService } from './shared/auth-core/auth-core.service';
import { MenuBarItem } from './shared/components/menu-bar/menu-bar.interfaces';
import { Router } from '@angular/router';


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
      routePath: 'portfolio',
      visible: this.auth.isAuthenticated$()

    },
    {
      name: 'Benutzer',
      routePath: 'userTable',
      visible: this.auth.isAuthenticated$()

    },

    {
      name: 'Impressum',
      routePath: 'impressum',
      visible: of(true)
    },
    {
      name: 'Login',
      routePath: 'login',
      visible: this.auth
        .isAuthenticated$()
        .pipe(map((isAuthenticated: boolean) => !isAuthenticated)),
      highlighted: true,
      icon: 'login'
    },


    {
      name: 'Logout',
      routePath: 'logout',
      visible: this.auth.isAuthenticated$(),
      highlighted: true,
      icon: 'logout'


    },






  ];

  constructor(private auth: AuthCoreService, private router: Router) { }



  ngOnInit() {
    this.checkLogin();
  }

  private checkLogin() {
    this.auth.isAuthenticated$().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
