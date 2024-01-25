import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuyStockItemDialogComponent } from 'src/app/shared/components/buy-stock-item-dialog/buy-stock-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Komponente zur Übersicht der Favorisierten Portfolioelementen.
 */
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
  pagedPortfolioItems: PortfolioItem[] = [];



  constructor(private portfolioService: PortfolioService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) { } // private productsHttpService: ProductHttpService


/**
 * Wird beim Initialisieren der Komponente aufgerufen.
 * Lädt die favorisierten Portfolioelemente und setzt den aktuellen Benutzernamen.
 */
ngOnInit(): void {
  // Ruft den derzeit eingeloggten Benutzer ab und lädt dessen favorisierte Portfolioelemente
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

  // Setzt den aktuellen Benutzernamen
  this.portfolioService.getCurrentUser().subscribe((user: any) => {
    this.currentUsername = user.username;
  }, error => {
    console.error('Fehler:', error);
  });

  // Initialisiert die Ladevorgänge für die Liste der favorisierten Portfolioelemente
  this.loadFavPortfolioList();
  this.resultsLength = this.portfolioItemList.length;
  // Setzt die Anfangsseitenparameter für die Paginierung
  this.changePage({ pageIndex: 0, pageSize: 5 });
}
/**
 * Lädt die Liste der favorisierten Portfolioelemente des derzeit eingeloggten Benutzers.
 * Setzt den Ladestatus beim Beginn und Ende des Ladeprozesses.
 */
loadFavPortfolioList(): void {
  this.isLoadingResults = true; // Startet den Ladevorgang
  this.portfolioService.getCurrentUser().subscribe((user: UserEntity) => {
    // Ruft die favorisierten Portfolioelemente des Benutzers ab
    this.portfolioService.getFavoritePortfolioItems(user.username).subscribe({
      next: (items) => {
        this.portfolioItemList = items;
        this.resultsLength = items.length;
        // Aktualisiert die Anzeige für die neue Seite
        this.changePage({ pageIndex: 0, pageSize: 5 });
        console.log("laden", items);
        this.isLoadingResults = false; // Beendet den Ladevorgang
      },
      error: (error) => {
        // Fehlerbehandlung
        console.error('Fehler beim Laden der Liste', error);
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen", {duration: 3000});
        this.isLoadingResults = false; // Beendet den Ladevorgang auch im Fehlerfall
      }
    });
  });
}

  /**
   * Navigiert zur Detailansicht eines Portfolioelements.
   * @param isin Die ISIN des betreffenden Portfolioelements.
   */
  onIsinClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin]);
  }

  /**
 * Wechselt den Favoritenstatus eines Portfolioelements.
 * Schickt eine Anfrage an den PortfolioService, um den Status zu ändern,
 * @param itemId Die ID des Portfolioelements, dessen Favoritenstatus geändert werden soll.
 */
toggleFavorite(itemId: number): void {
  this.portfolioService.favoritePortfolioItem(this.currentUsername, itemId).subscribe(
    response => {
      // Überprüfen, ob die Antwort einen definierten Favoritenstatus enthält
      this._snackBar.open("Aktion war erfolgreich", "Schließen" , {duration: 3000});
    },
    error => {
      // Fehlerbehandlung, wenn ein Fehler beim Wechseln des Favoritenstatus auftritt
      console.error('Fehler beim Toggle des Favoritenstatus', error);
    }
  );
  // Neuladen der Liste der favorisierten Portfolioelemente
  this.loadFavPortfolioList();
}


  /**
   * Öffnet einen Dialog zum Kauf eines Portfolioelements.
   * @param isin Die ISIN des zu kaufenden Portfolioelements.
   */
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

   /**
   * Ändert die angezeigte Seite der favorisierten Portfolioelemente.
   * @param event Das Paginierungsereignis mit den neuen Seiteninformationen.
   */
  changePage(event: any) {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.pagedPortfolioItems = this.portfolioItemList.slice(start, end);
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
