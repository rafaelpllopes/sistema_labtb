import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  autenticar(userName: string, password: string) {
    return this.http
      .post(`${API_URL}/usuario/login`, { user_name: userName, user_password: password }, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        //console.log(`Usuario ${userName} autenticado com token ${authToken}`);
      }));
  }
}
