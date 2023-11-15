import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioDetailDTO } from 'src/app/shared/models/portfolioDetailDTO';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { PortfolioItemService } from 'src/app/shared/services/http/portfolioItem.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})



export class DetailComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'name', 'description', 'category','totalQuantity','averagePrice', 'purchaseDate', 'quantity', 'purchasePrice', 'totalPrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioDetail: PortfolioDetailDTO | undefined;

  public portfolioList: Portfolio[] = [];
  public portfolioItemList: PortfolioItem[] = [];
  public portfolioDetailList: PortfolioDetailDTO[] = [];




  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(public portfolioService: PortfolioService, private portfolioItemService: PortfolioItemService, private route: ActivatedRoute) {
    

  };

  showDetails(row: Portfolio): void {
    const portfolioId = 1;
    this.portfolioService.getDetailPortfolioList(portfolioId).subscribe((detail) => {
      // Hier kannst du die Detailinformationen anzeigen, z.B. in einem Dialog oder einer anderen Ansicht
      console.log(detail); // Zum Testen: Gib die Detailinformationen in der Konsole aus
    });
  }



  ngOnInit(): void {
    this.portfolioService
      .getDetailPortfolioList(1)
      .subscribe((response: PortfolioDetailDTO) => {
        this.portfolioDetailList = [response];
      });
      this.route.params.subscribe(params => {
        const id = +params['id']; // Convert to number
        console.log("Portfolio ID:", id); // Debug
        if (!isNaN(id)) {
          this.portfolioService.getDetailPortfolioList(id).subscribe(detail => {
            this.portfolioDetail = detail;
          });
        } else {
          console.error("Invalid ID:", id);
        }
    });
    this.portfolioItemService
      .getPortfolioItemList()
      .subscribe((response: PortfolioItem[]) => {
        this.portfolioItemList = response;
      })
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
