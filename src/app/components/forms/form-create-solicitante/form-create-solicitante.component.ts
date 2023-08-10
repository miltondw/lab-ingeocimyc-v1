import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ISolicitanteData} from '@app/models/Solicitante.model'
import {SolicitanteService} from '@app/services/solicitante.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-form-create-solicitante',
  templateUrl: './form-create-solicitante.component.html',
  styleUrls: ['./form-create-solicitante.component.sass']
})
export class FormCreateSolicitanteComponent {
  form: FormGroup = new FormGroup({});
  values:ISolicitanteData|null= null;
  constructor (
    private fb: FormBuilder,
    private solicitanteService:SolicitanteService,
    private router: Router
    ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      business: [''],
      email: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.solicitanteService.create(this.values).subscribe({
          next: () => {
            this.router.navigate(['/lab/list/solicitantes'])
          },
          error: (error) => {
            alert("Error")
            console.error('Error al obtener proyectos:', error);
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}
