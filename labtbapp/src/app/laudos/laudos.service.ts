import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaudosList } from './laudos-list/laudos-list';
import { Laudo } from './laudo';

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
      .get<any[]>(`${API}/laudos/${id}`);
  }

  getPacienteByCns(cns: number) {
    return this.http
      .get(`${API}/pacientes/cns/${cns}`);
  }
  
  getPacienteByName(nome: string) {
    return this.http
      .get<any[]>(`${API}/pacientes/nome/${nome}`);
  }

  addLaudo(laudo: any) {
    return this.http
      .post(`${API}/laudos`, {laudo});
  }

  updateLaudo(id: number, laudo: Laudo) {
    return this.http
      .put(`${API}/laudos/${id}`, {laudo});
  }

  updateLaudoResultado(id: number,laudo: any) {
    return this.http
      .put(`${API}/laudos/resultado/${id}`, {laudo});
  }

  getResultados() {
    return this.http
      .get<any[]>(`${API}/resultados`);
  }

  getAspectos() {
    return this.http
      .get<any[]>(`${API}/aspectos`);
  }
}
