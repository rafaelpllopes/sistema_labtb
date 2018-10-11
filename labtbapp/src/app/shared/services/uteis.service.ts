import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UteisService {

  meses = [
    {
      nome: "Janeiro",
      numero: "01"
    },
    {
      nome: "Fevereiro",
      numero: "02"
    },
    {
      nome: "Março",
      numero: "03"
    },
    {
      nome: "Abril",
      numero: "04"
    },
    {
      nome: "Maio",
      numero: "05"
    },
    {
      nome: "Junho",
      numero: "06"
    },
    {
      nome: "Julho",
      numero: "07"
    },
    {
      nome: "Agosto",
      numero: "08"
    },
    {
      nome: "Setembro",
      numero: "09"
    },
    {
      nome: "Outubro",
      numero: "10"
    },
    {
      nome: "Novembro",
      numero: "11"
    },
    {
      nome: "Dezembro",
      numero: "12"
    }
  ];

  constructor() { }

  getMeses(): any[] {
    return this.meses;
  }

  getAnos(): number[] {
    let anos = [];
    for(let i = 2018; i <= new Date().getFullYear(); i++) {
      anos.push(i);
    }

    return anos;
  } 
}
