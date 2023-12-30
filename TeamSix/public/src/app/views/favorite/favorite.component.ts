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
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
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

  constructor(private portfolioService: PortfolioService, private router: Router) { } // private productsHttpService: ProductHttpService

  
  ngOnInit(): void {
    this.portfolioService.getCurrentUser().subscribe((user: UserEntity) => {
      this.portfolioService.getFavoritePortfolioItems(user.username).subscribe((response: PortfolioItem[]) => {
        this.portfolioItemList = response;
        console.log('Favorite data received:', this.portfolioItemList);
      }, error => {
        console.error('Error fetching favorite portfolio items:', error);
      });
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }
  onWknClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin ]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  async sendCurrentItem(isin: string): Promise<void> {
    localStorage.clear()
    this.portfolioDetailItem = await firstValueFrom(this.portfolioService.getDetailPortfolioList(1, isin));
    localStorage.setItem('portfolioDetailItem', JSON.stringify(this.portfolioDetailItem));
    this.router.navigate(['buy-item']);

  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
