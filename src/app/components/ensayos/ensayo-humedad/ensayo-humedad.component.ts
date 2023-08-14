import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ELEMENT_DATA } from './data'
import { RouterStateService } from '@app/services/router-state.service'
import { HumedadService } from '@app/services/ensayos/humedad.service'
import { IHumedadDto } from '@app/models/ensayos/Humedad.model'

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
  dataSource: Object[] = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values: IHumedadDto|any = {};
  edit: boolean = false;
  depth: string = ''
  new: boolean = true;
  constructor (
    private fb: FormBuilder,
    private humedadService: HumedadService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        id && this.humedadService.get(id).subscribe({
          next: (data) => {
            if (data?.depth.length > 0) {
              this.edit = true;
              const depth=data.depth
              this.values = data
              if(data.cylinder){
                this.values.cylinder={}
                this.values.cylinder.diameter=data.cylinder[0]
                this.values.cylinder.height=data.cylinder[1]
              }
              this.values.depth={}
              this.values.depth.de=depth[0]
              this.values.depth.hasta=depth[1]
              this.new = false;
              this.form.patchValue(this.values)
           }
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      tare_weight: [''],
      tare_plus_wet_soil_weight: ['',],
      tare_plus_dry_soil: [''],
      dry_soil_weight: [''],
      water_weight: [''],
      humidity: [''],
      depth: this.fb.group({
        de: [''],
        hasta: [''],
      }),
      cylinder: this.fb.group({
        diameter: [''],
        height: [''],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      this.values.depth=Object.values(this.values.depth)
      this.values.cylinder=Object.values(this.values.cylinder)
      if (this.new) {
        this.humedadService.create(this.values).subscribe({
          next: () => {
            this.edit = true
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      } else {
        this.humedadService.update(this.values).subscribe({
          next: () => {
            this.edit = true
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  activeEdit() {
    this.edit = false
  }
}


