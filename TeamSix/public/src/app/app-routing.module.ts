import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { OverviewComponent } from './views/overview/overview.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { AddPortfolioItemComponent } from './views/addPortfolioItem/addPortfolioItem.component';
import { BuyItemComponent } from './views/buyItem/buyItem.component'; 

const routes: Routes = [
  {
    path: 'portfolio',
    component: OverviewComponent,
  },

  {
    path: 'portfolio/:id/detail/:wkn',
    component: DetailComponent,
  },

  {
    path: 'add-item',
    component: AddPortfolioItemComponent,
  },

  {
    path: 'buy-item',
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
    redirectTo: 'portfolio',
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