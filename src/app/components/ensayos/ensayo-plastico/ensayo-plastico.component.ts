import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ensayo-plastico',
  templateUrl: './ensayo-plastico.component.html',
  styleUrls: ['./ensayo-plastico.component.sass']
})
export class EnsayoPlasticoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda'
  ];
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values:any = {};
  stringValues = ["primera", "segunda", "tercera"]

  initialValues = {
    tare_number: [''],
    tare_weight: ['',],
    tare_plus_wet_soil_weight: [''],
    tare_plus_dry_soil: [''],
    water_weight: [''],
    dry_soil_weight: [''],
    humidity: [''],
  }
  constructor (
    private fb: FormBuilder,

  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      segunda: this.fb.group(this.initialValues),
      tercera: this.fb.group(this.initialValues),
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        console.log(this.values)
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}
