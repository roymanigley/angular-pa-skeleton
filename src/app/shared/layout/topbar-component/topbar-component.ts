import { Component } from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {SharedModule} from '../../shared-module';
import {AuthService} from '../../../core/auth/auth-service';

@Component({
  selector: 'app-topbar-component',
  imports: [
    Toolbar, SharedModule
  ],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.css',
})
export class TopbarComponent {

  constructor(public authService: AuthService) {
  }
}
