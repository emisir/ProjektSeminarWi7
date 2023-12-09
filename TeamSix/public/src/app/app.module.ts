import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { OverviewComponent } from './views/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DetailComponent } from './views/detail/detail.component';
import { HomeComponent } from './views/home/home.component';
import { UserTableComponent } from './views/userTable/userTable.component';

import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddPortfolioItemComponent } from './views/addPortfolioItem/addPortfolioItem.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from './shared/auth-core/auth-interceptor..service';




@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailComponent,
    ImpressumComponent,
    AddPortfolioItemComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    UserTableComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MenuBarComponent,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
