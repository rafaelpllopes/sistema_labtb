import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaudosList } from './laudos-list/laudos-list';
import { Laudo } from './laudo';
import { environment } from 'src/environments/environment';

const API = environment.API;

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
      .post(`${API}/laudos`, { laudo });
  }

  updateLaudo(id: number, laudo: Laudo) {
    return this.http
      .put(`${API}/laudos/${id}`, { laudo });
  }

  updateLaudoResultado(id: number, laudo: any) {
    return this.http
      .put(`${API}/laudos/resultado/${id}`, { laudo });
  }

  getResultados() {
    return this.http
      .get<any[]>(`${API}/resultados`);
  }

  getAspectos() {
    return this.http
      .get<any[]>(`${API}/aspectos`);
  }

  getUnidades() {
    return this.http
      .get<any[]>(`${API}/unidades`);
  }

  getMateriais() {
    return this.http
      .get<any[]>(`${API}/materiais`);
  }

  deleteLaudo(id: number) {
    return this.http
      .delete(`${API}/laudos/${id}`);
  }

  filterLaudos(cns: number, paciente: string, mes: string, ano: string)  {
    const PARAMS = new HttpParams()
      .append('cns', cns.toString())
      .append('nome', paciente)
      .append('mes', mes)
      .append('ano', ano);

    return this.http
      .get<LaudosList[]>(`${API}/laudos/filter`, { params: PARAMS });
  }
}
