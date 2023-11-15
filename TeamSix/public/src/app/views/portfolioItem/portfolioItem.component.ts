import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
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

  public portfolioItemList: PortfolioItem[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioItemService: PortfolioItemService) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioItemService
      .getPortfolioItemList()
      .subscribe((response: PortfolioItem[]) => {
        this.portfolioItemList = response;
      });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
