import { Injectable } from '@angular/core'; // Imports the Injectable decorator, which marks this class as a service that can be provided via dependency injection.
import { CanActivate, Router } from '@angular/router'; // Imports the CanActivate interface, which is used to create route guards, and the Router service, which allows navigation within the application.
import { SessionService } from './session.service'; // Imports the SessionService, which is presumably responsible for managing user sessions and authentication status.

@Injectable({
  providedIn: 'root' // This metadata object configures the service to be provided in the root module. This makes the AuthGuard a singleton, meaning only one instance of it will be created and shared across the application.  This is important for a guard, as we want consistent behavior.
})
export class AuthGuard implements CanActivate { // The AuthGuard class implements the CanActivate interface.  This means it must define a canActivate() method, which determines whether a user can access a specific route.

  /**
   * Constructor for the AuthGuard.
   *
   * @param sessionService The SessionService instance, injected via dependency injection.  Used to check if a user is logged in.
   * @param router The Router instance, injected via dependency injection. Used to redirect the user to the login page if they are not authenticated.
   */
  constructor(private sessionService: SessionService, private router: Router) {} // The constructor receives instances of the SessionService and Router through dependency injection. This allows the AuthGuard to use these services to check authentication status and perform navigation.

  /**
   * Determines if the user is authorized to access the requested route.
   *
   * @returns A boolean value.  True if the user is authenticated and allowed to access the route, false otherwise.
   */
  canActivate(): boolean { // The canActivate() method is the core of the guard.  It's called by the Angular Router before a route is activated.
    if (this.sessionService.hasSessionData()) { // Calls the hasSessionData() method of the SessionService. This method likely checks if a valid session exists (e.g., a token is present, user is logged in, etc.).
      return true; // Allow access if session exists. If hasSessionData() returns true, it means the user is authenticated, so the guard allows access to the route by returning true.
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated. If hasSessionData() returns false, it means the user is not authenticated. The guard then uses the Router to navigate the user to the '/login' route.
      return false; // Prevents access to the route.  Crucially, the canActivate method also returns false, which tells the Angular Router to block access to the originally requested route.  This prevents unauthenticated users from seeing protected content.
    }
  }
}