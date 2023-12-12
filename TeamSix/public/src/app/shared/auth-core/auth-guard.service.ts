import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthCoreService } from './auth-core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthCoreService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated$();
  }
}
