import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'name', 'totalQuantity', 'averagePrice', 'totalPrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioItemList: PortfolioItem[] = [];
  public userEntityList: UserEntity[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService, private router: Router) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioService.getPortfolioSummary(1).subscribe((response: PortfolioItem[]) => {
      this.portfolioItemList = response;
      console.log('Daten empfangen:', this.portfolioItemList);
    });

    this.portfolioService.getUserEntity().subscribe(
      (data: UserEntity) => {
        console.log('Empfangene Daten:', data);
      },
      (error) => {
        // Hier können Sie Fehlerbehandlung hinzufügen
        console.error('Fehler beim Empfangen der Daten:', error);
      }
    );

  }
  onWknClick(wkn: string): void {
    this.router.navigate(['portfolio/1/detail', wkn]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
