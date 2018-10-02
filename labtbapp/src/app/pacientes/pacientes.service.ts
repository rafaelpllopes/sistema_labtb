import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(
    private http: HttpClient
  ) { }

  getPacientes(page: number) {
    const PARAMS = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<any[]>(`${API}/pacientes`, { params: PARAMS });
  }
}
