import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { }

  buscaProducao(ano, mes) {
    return this.http
      .post(`${API}/reports/producao`, { ano, mes });
  }

  totalAnoMes(ano, mes) {
    return this.http
      .post(`${API}/reports/totalanomes`, { ano, mes })
  }

  informeMensal(ano, mes) {
    return this.http
      .post(`${API}/reports/informe-mensal`, { ano, mes });
  }

}
