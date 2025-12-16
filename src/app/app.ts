import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopbarComponent} from './shared/layout/topbar-component/topbar-component';
import {AuthService} from './core/auth/auth-service';
import {SharedModule} from './shared/shared-module';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  username?: string
  password?: string

  constructor(public authService: AuthService) {
    this.authService.initCsrf().subscribe(() => authService.initUser())
  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username!, this.password!).subscribe()
    }
  }
}
