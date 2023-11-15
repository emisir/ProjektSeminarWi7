import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioSummary } from 'src/app/shared/models/portfolioSummary';
import { PortfolioSummaryService } from 'src/app/shared/services/http/portfolioSummary.service';


@Component({
  selector: 'app-portfolioSummary',
  templateUrl: './portfolioSummary.component.html',
  styleUrls: ['./portfolioSummary.component.scss'],
})

export class portfolioSummaryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'totalQuantity', 'averagePrice', 'totalPrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioSummaryList: PortfolioSummary[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioSummaryService: PortfolioSummaryService) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioSummaryService
      .getTotalValuesList()
      .subscribe((response: PortfolioSummary[]) => {
        this.portfolioSummaryList = response;
      });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
