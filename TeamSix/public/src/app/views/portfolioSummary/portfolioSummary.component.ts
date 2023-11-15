import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioSummary } from 'src/app/shared/models/portfolioSummary';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private portfolioService: PortfolioService,  private route: ActivatedRoute) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      if (!isNaN(id)) {
        this.portfolioService.getPortfolioSummary(id).subscribe(portfolioSummaryList => {
          this.portfolioSummaryList = portfolioSummaryList;
        });
      } else {
        console.error("Invalid ID:", id);
      }
    
    });
  }
  
  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
