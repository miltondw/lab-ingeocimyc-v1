import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterStateService } from '@app/services/router-state.service'
import { LiquidoService } from '@app/services/ensayos/liquido.service'
import {ILiquido} from '@app/models/ensayos/Liquido.model'
@Component({
  selector: 'app-ensayo-liquido',
  templateUrl: './ensayo-liquido.component.html',
  styleUrls: ['./ensayo-liquido.component.sass']
})
export class EnsayoLiquidoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda',
    'tercera'
  ];
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  values:ILiquido[]|any = [];
  datos:ILiquido[]|any = [];
  stringValues = ["primera", "segunda", "tercera"]
  muestra_id:string='1'
  edit=false
  new=true
  initialValues = {
    number_of_strokes: [''],
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
    private liquidoService: LiquidoService,
    private routerStateService: RouterStateService
  ) {
    this.buildForm()
  }
  ngOnInit(): void {
    this.routerStateService.muestraProject$.subscribe({
      next: (id) => {
        id && this.liquidoService.get(id).subscribe({
          next: (data) => {
            this.datos=data
            this.muestra_id=id
            const liquido={primera:{},segunda:{},tercera:{}}
            if(this.datos[0]){
            liquido.primera=this.datos[this.datos[0].numero_prueba-1]
            liquido.segunda=this.datos[this.datos[1].numero_prueba-1]
            liquido.tercera=this.datos[this.datos[2].numero_prueba-1]
            this.form.patchValue(liquido)
            this.values=liquido
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
      segunda: this.fb.group(this.initialValues),
      tercera: this.fb.group(this.initialValues),
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
        this.values.tercera.muestra_id=this.muestra_id
        this.values.tercera.numero_prueba=3
        const liquidoDto=[]
        liquidoDto.push(this.values.primera,this.values.segunda,this.values.tercera)
       if(this.new){
         liquidoDto.map(liquido=>{
        this.liquidoService.create(liquido).subscribe({
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
        console.log("update",liquidoDto)
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
