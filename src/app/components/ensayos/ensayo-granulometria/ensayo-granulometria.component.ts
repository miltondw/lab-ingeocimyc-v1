import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEnsayoGranulometriaDTO } from '@app/models/ensayos/Granulometria.model'
import { GranulometriaService } from '@app/services/ensayos/granulometria.service'
import { RouterStateService } from '@app/services/router-state.service'

@Component({
  selector: 'app-ensayo-granulometria',
  templateUrl: './ensayo-granulometria.component.html',
  styleUrls: ['./ensayo-granulometria.component.sass']
})

export class EnsayoGranulometriaComponent {
  displayedColumns: string[] = [
    'pulgada',
    'mm',
    'gr'
  ];
  dataSource = ELEMENT_DATA;
  values: IEnsayoGranulometriaDTO | any = {}
  form: FormGroup = new FormGroup({});
  edit:boolean=false;
  new:boolean=true;
  muestraId='1';
  constructor (
    private fb: FormBuilder,
    private granulometriaService: GranulometriaService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        id && this.granulometriaService.get(id).subscribe({
          next: (data) => {
            if(typeof data?.tamices === 'string' && data?.tamices){
              this.form.patchValue(JSON.parse(data.tamices))
              this.edit=true;
              this.values.tamices = this.form.value
              this.muestraId=id;
              this.values.muestra_id=this.muestraId;
              this.new=false;
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
      inches2: [''],
      inches1: [''],
      inches34: ['',],
      inches12: [''],
      inches38: [''],
      inchesN4: [''],
      inchesN10: [''],
      inchesN40: [''],
      inchesN200: [''],
      inchesP200: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.values.tamices = this.form.value
      this.values.muestra_id=this.muestraId;
      for (let propiedad in this.values.tamices) {
        if (this.values.tamices[propiedad] === null) {
           this.values.tamices[propiedad] = 0;
        }
      }
      if(this.new){
        this.granulometriaService.create(this.values).subscribe({
          next: () => {
            this.edit=true
          },
          error: (error) => {
            console.error('Error :', error);
          }
        });
      } else {
        this.granulometriaService.update(this.values).subscribe({
          next: () => {
            this.edit=true
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
  activeEdit(){
    this.edit=false
  }

}
