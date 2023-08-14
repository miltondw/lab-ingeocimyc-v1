import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlasticoService } from '@app/services/ensayos/plastico.service'
import { RouterStateService } from '@app/services/router-state.service'
import {IPlastico} from '@app/models/ensayos/Plastico.model'
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
  values:IPlastico[]|any = [];
  datos:IPlastico[]|any = [];
  stringValues = ["primera", "segunda"]
  muestra_id:string='1'
  edit=false
  new=true
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
    private plasticoService: PlasticoService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        id && this.plasticoService.get(id).subscribe({
          next: (data) => {
            this.datos=data
            this.muestra_id=id
            const plastico={primera:{},segunda:{}}
            if(this.datos[0]){
            plastico.primera=this.datos[this.datos[0].numero_prueba-1]
            plastico.segunda=this.datos[this.datos[1].numero_prueba-1]
            this.form.patchValue(plastico)
            this.values=plastico
            this.new=false;
            this.edit=true;
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
      primera: this.fb.group(this.initialValues),
      segunda: this.fb.group(this.initialValues)
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.values.primera.muestra_id=this.muestra_id
        this.values.primera.numero_prueba=1
        this.values.segunda.muestra_id=this.muestra_id
        this.values.segunda.numero_prueba=2
        const plasticoDto=[]
        plasticoDto.push(this.values.primera,this.values.segunda)
       if(this.new){
         plasticoDto.map(plastico=>{
        this.plasticoService.create(plastico).subscribe({
            next: () => {
            this.edit = true
            },
             error: (error) => {
               console.error('Error :', error);
             }
           });
           })
       }else{
        this.edit = true
        console.log("update",plasticoDto)
       }
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  activeEdit() {
    this.edit = false
  }
}
