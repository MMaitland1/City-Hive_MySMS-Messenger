import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    if (this.sessionService.hasSessionData()) {
      return true; // ✅ Allow access if session exists
    } else {
      this.router.navigate(['/login']); // ❌ Redirect to login if not authenticated
      return false;
    }
  }
}
