import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { ICreateProjectDTO, IProject, IProjectData } from '@app/models/Project.model'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.API_URL + '/project';

  constructor (private http: HttpClient) { }

  get(page: number = 0, elements: number = 5): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiUrl}?page=${page}&elements=${elements}`);
  }

  create(project: ICreateProjectDTO): Observable<IProjectData> {
    return this.http.post<IProjectData>(this.apiUrl, project);
  }
  getMuestra(projectId: string, sondeoId: string, muestraId: string): Observable<{id:number}> {
    return this.http.get<{id:number}>(
      `${environment.API_URL}/muestra?projectId=${projectId}&probeId=${sondeoId}&muestraId=${muestraId}`
      );
  }

}
