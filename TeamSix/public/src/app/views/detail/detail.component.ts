import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { WknTable } from 'src/app/shared/models/wknTable';
import { PortfolioDetailDTO } from 'src/app/shared/models/portfolioDetailDTO';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { WknTableService } from 'src/app/shared/services/http/wknTable.service';

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
  public wknTableList: WknTable[] = [];
  public portfolioDetailList: PortfolioDetailDTO[] = [];




  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(public portfolioService: PortfolioService, private wknTableService: WknTableService, private route: ActivatedRoute) {


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
      const id = +params['id']; // '+' konvertiert den Parameter in eine Zahl
      this.portfolioService.getDetailPortfolioList(id).subscribe(detail => {
        this.portfolioDetail = detail;
      });
    });
    this.wknTableService
      .getWknTableList()
      .subscribe((response: WknTable[]) => {
        this.wknTableList = response;
      })
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
