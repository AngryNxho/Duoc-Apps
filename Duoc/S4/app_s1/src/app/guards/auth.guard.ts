import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DbTaskService } from '../service/myservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private dbTaskService: DbTaskService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isActive = await this.dbTaskService.isSessionActive();
    if (!isActive) {
      this.router.navigate(['/login']); // Redirige al login si no hay sesión activa
      return false;
    }
    return true;
  }
}
