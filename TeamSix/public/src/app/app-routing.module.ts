import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { OverviewComponent } from './views/overview/overview.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { BuyItemComponent } from './views/buyItem/buyItem.component';
import { AddPortfolioItemComponent } from './views/addPortfolioItem/addPortfolioItem.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { AuthGuardService } from './shared/auth-core/auth-guard.service';
import { UserTableComponent } from './views/userTable/userTable.component';
import { FavoriteComponent } from './views/favorite/favorite.component';



const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'portfolio',
    component: OverviewComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },

  {
    path: 'portfolio/:id/detail/:isin',
    component: DetailComponent,
  },
  {
    path: 'userTable',
    component: UserTableComponent,
  },

  {
    path: 'add-item',
    component: AddPortfolioItemComponent,
  },

  {
    path: 'portfolio/:id/buy-item/:isin',
    component: BuyItemComponent,
  },

  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'somewhatever',
    loadComponent: () =>
      import(
        './shared/components/four-zero-four/four-zero-four.component'
      ).then((mod) => mod.FourZeroFourComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/four-zero-four/four-zero-four.component'
      ).then((mod) => mod.FourZeroFourComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
