import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user$: Observable<any>;

  constructor(
    private service: UserService,
    private router: Router
  ) { 
    this.user$ = service.getUser();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['']);
  }
}
