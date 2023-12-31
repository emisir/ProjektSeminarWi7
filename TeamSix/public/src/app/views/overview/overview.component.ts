import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, firstValueFrom } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['isin', 'name', 'totalQuantity', 'profitLossSum', 'plusButton', 'totalPrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioItemList: PortfolioItem[] = [];
  public userEntityList: UserEntity[] = [];
  public portfolioDetailItem: PortfolioDetail | undefined;
  private toDestroy$: Subject<void> = new Subject<void>();
  private currentUsername!: string;


  constructor(private portfolioService: PortfolioService, private router: Router) {

  } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.portfolioService.getPortfolioSummary(1).subscribe((response: PortfolioItem[]) => {
      this.portfolioItemList = response;
      console.log('Daten empfangen:', this.portfolioItemList);
    });

    this.portfolioService.getCurrentUser().subscribe((user: any) => {
      this.currentUsername = user.username;
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }




  toggleFavorite(itemId: number): void {
    const item = this.portfolioItemList.find(item => item.id === itemId);
    if (item) {
      item.isFavorite = !item.isFavorite;
      this.portfolioService.favoritePortfolioItem(this.currentUsername, itemId).subscribe(
        response => {
          console.log('Status aktualisiert', response);
        },
        error => {
          console.error('Fehler beim Aktualisieren des Status', error);
          console.log("daten", this.currentUsername, itemId);
        }

      );
    }
  }




  onWknClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  buyItem(id: number, isin: string): void {
    this.router.navigate(['/portfolio/1/buy-item', isin]);
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
