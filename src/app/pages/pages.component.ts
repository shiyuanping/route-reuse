import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  constructor(
     private authService: AuthService,
     private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        this.authService.token = null;
        this.router.navigate(['/auth/login']);
      }
    );
  }

}
