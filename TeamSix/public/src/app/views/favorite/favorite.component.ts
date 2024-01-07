import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, firstValueFrom } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddItemDialogComponent } from 'src/app/shared/components/add-item-dialog/add-item-dialog.component';
import { BuyStockItemDialogComponent } from 'src/app/shared/components/buy-stock-item-dialog/buy-stock-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  private currentUsername!: string;
  isLoadingDelete = false;
  isLoadingAdd = false;



  constructor(private portfolioService: PortfolioService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) { } // private productsHttpService: ProductHttpService


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
    this.loadFavPortfolioList();

  }

  loadFavPortfolioList(): void {
    this.isLoadingResults = true; // Start loading
    this.portfolioService.getCurrentUser().subscribe((user: UserEntity) => {
      this.portfolioService.getFavoritePortfolioItems(user.username).subscribe({
        next: (items) => {
          this.portfolioItemList = items;
          console.log("laden", items);
          this.isLoadingResults = false; // Stop loading
        },
        error: (error) => {
          console.error('Fehler beim Laden der Liste', error);
          this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen");
          this.isLoadingResults = false; // Stop loading even on error
        }
      });
    })
  }

  onIsinClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  toggleFavorite(itemId: number): void {
    const item = this.portfolioItemList.find(item => item.id === itemId);
    if (item) {
      if (item.isFavorite == true) {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen")
      } else {
        this.portfolioService.favoritePortfolioItem(this.currentUsername, itemId).subscribe(
          response => {
            console.log('Status aktualisiert', response);
            item.isFavorite = true;
          },
        );
      }
    } else {
      this._snackBar.open("Item not found in the portfolioItemList", "Schließen")
    }
  }

  openBuyStockItemDialog(isin: string): void {
    this.isLoadingAdd = true; // Start loading

    const dialogRef = this.dialog.open(BuyStockItemDialogComponent, {
      data: { isin: isin }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoadingAdd = false; // Stop loading
      if (result === 'added') {
        this.loadFavPortfolioList();
      }
    });
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
