import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import {ISolicitante,ISolicitanteData } from '@app/models/Solicitante.model'
@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  private apiUrl = environment.API_URL+'/solicitante';

  constructor (private http: HttpClient) { }

  get(page:number=0,elements:number=5): Observable<ISolicitante> {
    return this.http.get<ISolicitante>(`${this.apiUrl}?page=${page}&elements=${elements}`);
  }
  getByName(name:string): Observable<ISolicitanteData[]>{
    return this.http.get<ISolicitanteData[]>(`${this.apiUrl}/name?nombre=${name}`);
  }

  create(solicitante: ISolicitanteData): Observable<ISolicitanteData> {
    return this.http.post<ISolicitanteData>(this.apiUrl, solicitante);
  }

}
