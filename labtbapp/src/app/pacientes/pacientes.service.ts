import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.API;

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

  update(id: number, paciente: any) {
    return this.http
      .put(`${API}/pacientes/${id}`, { paciente })
  }

  getCep(cep: number) {
    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json`);
  }

  getPacientesByFilter(cns: string, nome: string, sexo: string) {
    const PARAMS = new HttpParams()
      .append('cns', cns)
      .append('nome', nome)
      .append('sexo', sexo);

    return this.http
      .get<any[]>(`${API}/pacientes/filter`, { params: PARAMS });
  }
}
