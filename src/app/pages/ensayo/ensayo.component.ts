import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterStateService } from '@app/services/router-state.service'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.component.html',
  styleUrls: ['./ensayo.component.sass']
})
export class EnsayoComponent {
  projectId:string|null=null;
  sondeoId:string|null=null;
  muestraId:string|null=null;
  constructor (
    private route: ActivatedRoute,
    private routerStateService:RouterStateService,
    private projectService:ProjectService
  ) { }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramsRoute) => {
        this.projectId=paramsRoute.get('id')
      });
    this.route.queryParamMap
      .subscribe(params => {
        this.sondeoId=params.get('sondeo')
        this.muestraId=params.get('muestra')
        if(this.projectId && this.sondeoId && this.muestraId){
          this.projectService.getMuestra(this.projectId,this.sondeoId,this.muestraId).subscribe({
            next: (data) => {
              const id=String(data.id)
              id && this.routerStateService.setMuestraProject(id);
            },
            error: (error) => {
              console.error('Error al obtener solicitante:', error);
            }
          });
        }
      });
  }
}
