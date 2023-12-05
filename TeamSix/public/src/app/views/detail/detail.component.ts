import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'wkn', 'name', 'description', 'category', 'totalQuantity', 'averagePrice', 'purchaseDate', 'quantity', 'purchasePrice', 'totalPrice', 'plusButton'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  public portfolioDetailItem: PortfolioDetail | undefined;




  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(public portfolioService: PortfolioService, private route: ActivatedRoute) {


  };


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let wkn = params['wkn'];
      this.portfolioService.getDetailPortfolioList(1, wkn)
        .subscribe((response: PortfolioDetail) => {
          this.portfolioDetailItem = response;
        });
    });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
