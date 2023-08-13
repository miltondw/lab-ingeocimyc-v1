import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  private idProject = new BehaviorSubject<string | null>(null);
  private idSondeo = new BehaviorSubject<string | null>(null);
  private idMuestra = new BehaviorSubject<string | null>(null);
  private muestraProject = new BehaviorSubject<string | null>(null);


  constructor() { }

  idProject$ = this.idProject.asObservable()
  idSondeo$ = this.idSondeo.asObservable()
  idMuestra$ = this.idMuestra.asObservable()
  muestraProject$ = this.muestraProject.asObservable()

  setIdProject(project: string) {
    this.idProject.next(project);
  }
  setIdSondeo(sondeo: string) {
    this.idSondeo.next(sondeo);
  }
  setIdMuestra(muestra: string ) {
   this.idMuestra.next(muestra);
  }
  setMuestraProject(muestra: string ) {
   this.muestraProject.next(muestra);
  }

}
