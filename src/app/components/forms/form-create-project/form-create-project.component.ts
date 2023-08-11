import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICreateProjectDTO,IProject,IProjectData} from '@app/models/Project.model'
import {ISolicitanteData } from '@app/models/Solicitante.model'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {ProjectService} from '@app/services/project.service'
import {SolicitanteService} from '@app/services/solicitante.service'

@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.sass']
})
export class FormCreateProjectComponent {
  form: FormGroup = new FormGroup({});
  values:ICreateProjectDTO|null= null;
  projects:IProjectData[]|null=null;
  solicitantes: ISolicitanteData[] = [];
  searchSubject = new Subject<string>();
 selectedSolicitante: string= '';
constructor (
    private fb: FormBuilder,
    private projectService:ProjectService,
    private solicitanteService:SolicitanteService,
    ) {
    this.buildForm()
this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.searchSolicitante(value);
    });
  }
  ngOnInit(): void {
    this.projectService.get().subscribe({
      next: (data:IProject) => {
        this.projects = data.content;
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
    // this.searchSubject.next('');
  }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      reference: ['', Validators.required],
      probes: [''],
      solicitante_id: ['', Validators.required]
    });
  }
  solicitanteName(event:Event){
    const e=event.target as HTMLInputElement;
    this.searchSubject.next(e.value);
  }
  searchSolicitante(value: string) {
    this.solicitanteService.getByName(value).subscribe({
      next: (data) => {
        this.solicitantes = data;
        this.selectedSolicitante=data[0].id;
      },
      error: (error) => {
        console.error('Error al obtener solicitante:', error);
      }
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.values.user_id='admin';
        this.projectService.create(this.values).subscribe({
          next: () => {
            console.log(this.values)
          },
          error: (error) => {
            console.error('Error al obtener proyectos:', error);
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}
