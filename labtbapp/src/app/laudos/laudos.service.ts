import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaudosList } from './laudos-list/laudos-list';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class LaudosService {

  constructor(
    private http: HttpClient
  ) { }

  getLaudos(page: number) {
    const PARAMS = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<LaudosList[]>(`${API}/laudos`, { params: PARAMS });
  }

  getLaudoById(id: number) {
    return this.http
      .get<LaudosList[]>(`${API}/laudos/${id}`);
  }

  getPacienteByCns(cns: number) {
    return this.http
      .get(`${API}/pacientes/cns/${cns}`);
  }
  
  getPacienteByName(nome: string) {
    return this.http
      .get<any[]>(`${API}/pacientes/nome/${nome}`);
  }
}
