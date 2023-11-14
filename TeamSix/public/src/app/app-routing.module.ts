import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { OverviewComponent } from './views/overview/overview.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { wknTableComponent } from './views/wknTable/wknTable.component';
import { totalValuesComponent } from './views/totalValues/totalValues.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'wknTable',
    component: wknTableComponent,
  },
  {
    path: 'wknTable/totalValues',
    component: totalValuesComponent,
  },
  {
    path: ':detail/:id',
    component: DetailComponent,
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
    redirectTo: 'overview',
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
