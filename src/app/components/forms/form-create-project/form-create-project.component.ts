import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICreateProjectDTO,IProject,IProjectData} from '@app/models/Project.model'
import {ProjectService} from '@app/services/project.service'
@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.sass']
})
export class FormCreateProjectComponent {
  form: FormGroup = new FormGroup({});
  values:ICreateProjectDTO|null= null;
  projects:IProjectData[]|null=null;
  constructor (
    private fb: FormBuilder,
    private projectService:ProjectService
    ) {
    this.buildForm()

  }
  ngOnInit(): void {
    this.projectService.get().subscribe({
      next: (data:IProject) => {
        this.projects = data.content;
        console.log(this.projects)
        console.log(data)
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
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
