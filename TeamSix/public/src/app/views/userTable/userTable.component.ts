import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from 'src/app/shared/components/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from 'src/app/shared/components/update-user-dialog/update-user-dialog.component';
import { Observable } from 'rxjs';




/**
 * Komponente zur Darstellung und Verwaltung von Benutzerdaten.
 * Ermöglicht das Anzeigen, Hinzufügen, Aktualisieren und Löschen von Benutzern.
 */
@Component({
  selector: 'app-userTable',
  templateUrl: './userTable.component.html',
  styleUrls: ['./userTable.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'username', 'password'];


  addedSuccessfully: boolean = false;
  updatedSuccessfully: boolean = false;
  resultsLength = 0;
  isRateLimitReached = false;
  public userEntityList: UserEntity[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();
  pagedUserEntities: UserEntity[] = [];

  constructor(private portfolioService: PortfolioService, public dialog: MatDialog,
    private router: Router, private _snackBar: MatSnackBar) { } // private productsHttpService: ProductHttpService

   /**
   * Initialisiert die Komponente und lädt die Benutzerliste.
   */
  ngOnInit(): void {
    this.loadUserList();
    this.portfolioService.getUserEntity().subscribe((response: UserEntity[]) => {
      this.userEntityList = response;
      console.log('Daten empfangen:', this.userEntityList);
    });
    this.resultsLength = this.userEntityList.length;
    this.changePage({ pageIndex: 0, pageSize: 5 });

  }

   /**
   * Maskiert das Passwort für die Anzeige.
   * @param password Das zu maskierende Passwort.
   * @returns Ein maskierter String.
   */
  maskPassword(password: string): string {
    return '●●●●●●●●';
  }

  /**
   * Lädt die Liste der Benutzer vom Server.
   */
  loadUserList(): void {
    this.portfolioService.getUserEntity().subscribe({
      next: (users) => {
        this.userEntityList = users;
        this.resultsLength = users.length;
        this.changePage({ pageIndex: 0, pageSize: 5 });
        this.addedSuccessfully = true;
      },
      error: (error) => {
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen", {duration: 3000});
      }
    });
  }

  /**
   * Öffnet den Dialog zum Hinzufügen eines neuen Benutzers.
   */
  getCurrentUser(): Observable<string> {
    console.log("Das ist der Eingeloggte User:", this.portfolioService.getCurrentUser())
    return this.portfolioService.getCurrentUser();
  }

 /**
   * Öffnet den Dialog zur Aktualisierung eines bestehenden Benutzers.
   * @param user Das Benutzerobjekt, das aktualisiert werden soll.
   */
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (this.addedSuccessfully === true) {
        this.loadUserList();
      }
    });
  }

  /**
 * Öffnet den Dialog zur Aktualisierung eines bestehenden Benutzers.
 * @param user Das Benutzerobjekt, das aktualisiert werden soll.
 */
openUpdateDialog(user: UserEntity): void {
  // Abrufen des derzeit eingeloggten Benutzers
  this.portfolioService.getCurrentUser().subscribe((loggedInUser: any) => {
    console.log("Eingeloggter Benutzer:", loggedInUser);

    // Überprüfung, ob der eingeloggte Benutzer der Benutzer ist, der aktualisiert werden soll
    if (loggedInUser.username === user.username) {
      console.log("Du kannst nicht dich selber bearbeiten");
      // Anzeige einer Benachrichtigung, falls der Benutzer sich selbst bearbeiten möchte
      this._snackBar.open("Du kannst nicht dich selber bearbeiten", "Schließen", {duration: 3000});
      return;
    }
    
    // Öffnet den Dialog zur Aktualisierung des Benutzers
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: user // Übergabe des zu aktualisierenden Benutzerobjekts an den Dialog
    });

    // Behandlung der Schließung des Dialogs
    dialogRef.afterClosed().subscribe(result => {
      // Wenn ein Benutzer erfolgreich hinzugefügt wurde, wird die Benutzerliste neu geladen
      if (this.addedSuccessfully === true) {
        this.loadUserList();
      }
    });
  });
}


/**
 * Löscht einen Benutzer anhand seines Benutzernamens.
 * @param username Der Benutzername des zu löschenden Benutzers.
 */
deleteUser(username: string): void {
  // Abrufen des derzeit eingeloggten Benutzers
  this.portfolioService.getCurrentUser().subscribe(
    (loggedInUser: any) => {
      console.log("Eingeloggter Benutzer:", loggedInUser);

      // Überprüfung, ob der eingeloggte Benutzer vorhanden ist
      if (loggedInUser && loggedInUser.username) {
        // Verhindert, dass ein Benutzer sich selbst löscht
        if (loggedInUser.username === username) {
          this._snackBar.open("Du kannst nicht dich selber löschen", "Schließen", {duration: 3000});
          return;
        } else {
          // Versucht, den Benutzer zu löschen
          this.portfolioService.deleteUserEntity(username).subscribe({
            next: (response) => {
              console.log('Benutzer wurde gelöscht', response);
              // Lädt die Benutzerliste neu, um die Änderungen zu reflektieren
              this.loadUserList();
            },
            error: (error) => {
              // Fehlerbehandlung, falls das Löschen fehlschlägt
              console.error('Fehler beim Löschen des Benutzers', error);
              this._snackBar.open("Fehler beim Löschen des Benutzers", "Schließen", {duration: 3000});
            }
          });
        }
      } else {
        // Fehlerbehandlung, falls kein eingeloggter Benutzer gefunden wird
        console.error('Fehler beim Abrufen des eingeloggten Benutzers');
        this._snackBar.open("Fehler beim Abrufen des eingeloggten Benutzers", "Schließen", {duration: 3000});
      }
    },
    (error) => {
      // Fehlerbehandlung für den Fall, dass der eingeloggte Benutzer nicht abgerufen werden kann
      console.error('Fehler beim Abrufen des eingeloggten Benutzers', error);
      this._snackBar.open("Fehler beim Abrufen des eingeloggten Benutzers", "Schließen", {duration: 3000});
    }
  );
}

/**
   * Ändert die angezeigte Seite der Benutzerliste.
   * @param event Das Paginierungsereignis mit den neuen Seiteninformationen.
   */
  changePage(event: any) {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.pagedUserEntities = this.userEntityList.slice(start, end);
  }

   /**
   * Wird aufgerufen, wenn die Komponente zerstört wird.
   * Bereinigt Ressourcen und abonnierte Observables.
   */
  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

}


