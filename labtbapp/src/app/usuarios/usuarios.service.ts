import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  usuarioExite(usuario) {
    return this.http
      .post(`${API}/usuario/existe`, { user_name: usuario });
  }

  getUsuarios(page: number) {
    const PARAMS = new HttpParams()
    .append('page', page.toString());

  return this.http
    .get<any[]>(`${API}/usuarios`, { params: PARAMS });
  }

  getUsuarioById(id: number) {
    return this.http
      .get(`${API}/usuarios/${id}`);
  }
}
