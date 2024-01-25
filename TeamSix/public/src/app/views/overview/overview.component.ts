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
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'src/app/shared/components/add-item-dialog/add-item-dialog.component';
import { BuyStockItemDialogComponent } from 'src/app/shared/components/buy-stock-item-dialog/buy-stock-item-dialog.component';

/**
 * Komponente zur Übersicht und Verwaltung von Portfolioelementen.
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioItemList: PortfolioItem[] = [];
  public userEntityList: UserEntity[] = [];
  public portfolioDetailItem: PortfolioDetail | undefined;
  private toDestroy$: Subject<void> = new Subject<void>();
  private currentUsername!: string;
  public currentUser: string = "";
  isLoadingDelete = false;
  isLoadingAdd = false;
  pagedPortfolioItems: PortfolioItem[] = []; // Für paginierte Items



  constructor(private portfolioService: PortfolioService, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) {

  } 

  ngOnInit(): void {
    // Laden der Portfolio-Zusammenfassung und der Benutzerdaten
    this.portfolioService.getPortfolioSummary(1).subscribe((response: PortfolioItem[]) => {
      this.portfolioItemList = response;
      console.log('Daten empfangen:', this.portfolioItemList);
    });

    this.portfolioService.getCurrentUser().subscribe((user: any) => {
      this.currentUsername = user.username;
      this.currentUser = user.name;
    }, error => {
      console.error('Fehler:', error);
    });

    this.loadPortfolioList();
    this.resultsLength = this.portfolioItemList.length;
    this.changePage({ pageIndex: 0, pageSize: 5 });
  }

/**
 * Wechselt den Favoritenstatus eines Portfolioelements.
 * Aktualisiert den Favoritenstatus auf dem Server und aktualisiert die Ansicht entsprechend.
 * @param itemId Die ID des Portfolioelements, dessen Favoritenstatus geändert werden soll.
 */
toggleFavorite(itemId: number): void {
  // Aufruf des PortfolioService, um den Favoritenstatus zu ändern
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
}

 /**
   * Navigiert zur Detailansicht eines Portfolioelements.
   * @param isin Die ISIN des betreffenden Portfolioelements.
   */
  onIsinClick(isin: string): void {
    this.router.navigate(['portfolio/1/detail', isin]);
  }

   /**
   * Löscht ein Portfolioelement anhand seiner ID.
   * @param id Die ID des zu löschenden Portfolioelements.
   */
  deletePortfolioItem(id: number): void {
    this.isLoadingDelete = true; // Start loading
    this.portfolioService.deletePortfolioItem(id).subscribe({
      next: (response) => {
        console.log('Portfolio item mit der id ' + id + ' wurde gelöscht', response);
        this.loadPortfolioList();
      },
      error: (error) => {
        console.error('Fehler beim Löschen', error);
        this._snackBar.open("Fehler beim Löschen des Portfolioitems", "Schließen", {duration: 3000});
      },
      complete: () => {
        this.isLoadingDelete = false; // Stop loading
      }
    });
  }

 /**
   * Lädt die Liste der Portfolioelemente.
   */
  loadPortfolioList(): void {
    this.isLoadingResults = true; // Start loading
    this.portfolioService.getPortfolioSummary(1).subscribe({
      next: (items) => {
        this.portfolioItemList = items;
        this.resultsLength = items.length;
        this.changePage({ pageIndex: 0, pageSize: 5 });
        console.log("laden", items);
        this.isLoadingResults = false; // Stop loading
      },
      error: (error) => {
        console.error('Fehler beim Laden der Liste', error);
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen", {duration: 3000});
        this.isLoadingResults = false; // Stop loading even on error
      }
    });
  }

  /**
   * Öffnet einen Dialog zum Hinzufügen eines neuen Portfolioelements.
   */
  openAddDialog(): void {
    this.isLoadingAdd = true; // Start loading
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.isLoadingAdd = false; // Stop loading
      if (result === 'added') {
        this.loadPortfolioList();
      }
    });
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
        this.loadPortfolioList();
      }
    });
  }

  /**
   * Ändert die angezeigte Seite der Portfolioelemente.
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
