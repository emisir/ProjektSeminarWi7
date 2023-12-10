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
  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }


  maskPassword(password: string): string {
    return '●●●●●●●●';
  }


  loadUserList(): void {
    this.portfolioService.getUserEntity().subscribe({
      next: (users) => {
        this.userEntityList = users;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Benutzerliste', error);
        this._snackBar.open("Fehler beim Laden der Benutzerliste", "Schließen");
      }
    });
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadUserList();
      }
    });
  }

  openUpdateDialog(user: UserEntity): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadUserList();
      }
    });
  }

  deleteUser(username: string): void {
    this.portfolioService.deleteUserEntity(username).subscribe({
      next: (response) => {
        console.log('User wurde gelöscht', response);
        this.loadUserList(); // Aktualisieren der Benutzerliste
      },
      error: (error) => {
        console.error('Fehler beim Löschen', error)
      }
    });
  }
}
