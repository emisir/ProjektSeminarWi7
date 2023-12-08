import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public userEntityList: UserEntity | undefined;
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService, private router: Router, private route: ActivatedRoute) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioService.getPortfolioSummary(1).subscribe((response: PortfolioItem[]) => {
      this.portfolioItemList = response;
      console.log('Daten empfangen:', this.portfolioItemList);
    });

    this.route.params.subscribe(params => {
      let name = params['name']
      this.portfolioService.getUserEntity()
        .subscribe((response: UserEntity) => {
          this.userEntityList = response;
          console.log('Name: ', this.userEntityList.name)
        });
    });

  }
  onWknClick(wkn: string): void {
    this.router.navigate(['portfolio/1/detail', wkn]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
