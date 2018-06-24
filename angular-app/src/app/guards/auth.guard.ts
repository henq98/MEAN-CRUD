import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.flashMessagesService.show('Necessário conectar-se para acessar o seu perfil', {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
