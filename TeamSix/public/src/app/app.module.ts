import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { OverviewComponent } from './views/overview/overview.component';

import { DetailComponent } from './views/detail/detail.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AddPortfolioItemComponent } from './views/addPortfolioItem/addPortfolioItem.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailComponent,
    ImpressumComponent,
    AddPortfolioItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MenuBarComponent,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
