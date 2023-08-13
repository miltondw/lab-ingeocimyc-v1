import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/atom/layout/layout.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateSolicitanteComponent } from './pages/create-solicitante/create-solicitante.component';
import { ListSolicitantesComponent } from './components/lists/list-solicitantes/list-solicitantes.component';
import { ListProjectsComponent } from './components/lists/list-projects/list-projects.component';
import { EnsayoComponent } from './pages/ensayo/ensayo.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'',
        redirectTo:'lab/crear/proyecto',
        pathMatch:'full'
      },
       {
        path:'lab/crear/proyecto',
        component:CreateProjectComponent
      },
      {
        path:'lab/crear/solicitante',
        component:CreateSolicitanteComponent
      },
      {
        path:'lab/list/solicitantes',
        component:ListSolicitantesComponent
      },
      {
        path:'lab/list/proyectos',
        component:ListProjectsComponent
      },
      {
        path:'lab/ensayo/:id',
        component:EnsayoComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
