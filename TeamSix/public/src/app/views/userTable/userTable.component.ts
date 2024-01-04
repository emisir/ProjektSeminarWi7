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

  constructor(private portfolioService: PortfolioService, public dialog: MatDialog,
    private router: Router, private _snackBar: MatSnackBar) { } // private productsHttpService: ProductHttpService


  ngOnInit(): void {
    this.loadUserList();
    this.portfolioService.getUserEntity().subscribe((response: UserEntity[]) => {
      this.userEntityList = response;
      console.log('Daten empfangen:', this.userEntityList);
    });
  }

  maskPassword(password: string): string {
    return '●●●●●●●●';
  }

  loadUserList(): void {
    this.portfolioService.getUserEntity().subscribe({
      next: (users) => {
        this.userEntityList = users;
        this.addedSuccessfully = true;
      },
      error: (error) => {
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen");
      }
    });
  }

  getCurrentUser(): Observable<string> {
    console.log("Das ist der Eingeloggte User:", this.portfolioService.getCurrentUser())
    return this.portfolioService.getCurrentUser();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (this.addedSuccessfully === true) {
        this.loadUserList();
      }
    });
  }

  openUpdateDialog(user: UserEntity): void {
    this.portfolioService.getCurrentUser().subscribe((loggedInUser: any) => {
      console.log("Logged-in user:", loggedInUser);

      if (loggedInUser.username === user.username) {
        console.log("Du kannst nicht dich selber Bearbeiten");
        this._snackBar.open("Du kannst nicht dich selber Bearbeiten", "Close");
        return;
      }
      const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
        data: user
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.addedSuccessfully === true) {
          this.loadUserList();
        }
      });
    });
  }


  deleteUser(username: string): void {
    // Fetch the logged-in user
    this.portfolioService.getCurrentUser().subscribe(
      (loggedInUser: any) => {
        console.log("Logged-in user:", loggedInUser);

        if (loggedInUser && loggedInUser.username) {
          if (loggedInUser.username === username) {
            this._snackBar.open("Du kannst nicht dich selber Löschen", "Close");
            return;
          } else {
            // Attempt to delete the user
            this.portfolioService.deleteUserEntity(username).subscribe({
              next: (response) => {
                console.log('User wurde gelöscht', response);
                this.loadUserList();
              },
              error: (error) => {
                console.error('Fehler beim Löschen', error);
                this._snackBar.open("Fehler beim Löschen des Benutzers", "Close");
              }
            });
          }
        } else {
          console.error('Fehler beim Abrufen des eingeloggten Benutzers');
          this._snackBar.open("Fehler beim Abrufen des eingeloggten Benutzers", "Close");
        }
      },
      (error) => {
        console.error('Fehler beim Abrufen des eingeloggten Benutzers', error);
        this._snackBar.open("Fehler beim Abrufen des eingeloggten Benutzers", "Close");
      }
    );
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

}


