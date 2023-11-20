import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PortfolioDetailDTO } from 'src/app/shared/models/portfolioDetailDTO';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { PortfolioItemService } from 'src/app/shared/services/http/portfolioItem.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolioItem.component.html',
  styleUrls: ['./portfolioItem.component.scss'],
})

export class portfolioItemComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'purchaseDate', 'quantity', 'purchasePrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioDetail: PortfolioDetailDTO | undefined;

  public portfolioItemList: PortfolioItem[] = [];
  public portfolioList: Portfolio[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();
  public portfolioDetailList: PortfolioDetailDTO[] = [];

  constructor(private portfolioItemService: PortfolioItemService, public portfolioService: PortfolioService, private route: ActivatedRoute) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioItemService
      .getPortfolioItemList()
      .subscribe((response: PortfolioItem[]) => {
        this.portfolioItemList = response;
      });
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      if (!isNaN(id)) {
        this.portfolioService.getDetailPortfolioList(id).subscribe(detail => {
          this.portfolioDetail = detail;
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
