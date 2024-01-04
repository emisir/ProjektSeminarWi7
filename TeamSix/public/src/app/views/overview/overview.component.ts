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
  public currentUser: string = "";


  constructor(private portfolioService: PortfolioService, private router: Router, private _snackBar: MatSnackBar) {

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

    this.portfolioService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user.name;
    }, error => {
      console.error('Error fetching current user:', error);
    });
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



  onWknClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin]); // Ersetzen Sie den Pfad entsprechend Ihrer Routing-Konfiguration
  }

  deletePortfolioItem(id: number): void {
    this.portfolioService.deletePortfolioItem(id).subscribe({
      next: (response) => {
        console.log('Portfolio item mit der id ' + id + ' wurde gelöscht', response);
        this.loadPortfolioList();
      },
      error: (error) => {
        console.error('Fehler beim Löschen', error);
        this._snackBar.open("Fehler beim Löschen des Portfolioitems", "Close");
      }
    });
  }

  loadPortfolioList(): void {
    this.portfolioService.getPortfolioSummary(1).subscribe({
      next: (items) => {
        this.portfolioItemList = items;
        console.log("laden", items)
      },
      error: (error) => {
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen");
      }
    });
  }

  buyItem(id: number, isin: string): void {
    this.router.navigate(['/portfolio/1/buy-item', isin]);
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
