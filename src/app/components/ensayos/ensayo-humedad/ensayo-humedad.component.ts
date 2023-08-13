import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ELEMENT_DATA } from './data'

@Component({
  selector: 'app-ensayo-humedad',
  templateUrl: './ensayo-humedad.component.html',
  styleUrls: ['./ensayo-humedad.component.sass']
})
export class EnsayoHumedadComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',

  ];
  dataSource:Object[] = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values: any = {};
  stringValues = ["primera"]
  initialValues={
    tare_weight: [''],
    tare_plus_wet_soil_weight: ['',],
    tare_plus_dry_soil: [''],
    dry_soil_weight: [''],
    water_weight: [''],
    humidity: [''],
    depthM: this.fb.group({
      de: [''],
      hasta: [''],
    }),
  }
  depth:string=''
  constructor (
    private fb: FormBuilder,
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      cylinder: this.fb.group({
        diameter: [''],
        height: [''],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      console.log(this.values)
      }else {
      this.form.markAllAsTouched()
    }
  }
}


