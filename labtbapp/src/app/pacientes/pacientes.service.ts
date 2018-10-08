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

  getPacientesById(id: number) {
    return this.http
      .get(`${API}/pacientes/${id}`);
  }

  add(paciente: any) {
    return this.http
      .post(`${API}/pacientes`, { paciente });
  }

  getCep(cep: number) {
    return this.http
    .get(`https://viacep.com.br/ws/${cep}/json`);
  }
}
