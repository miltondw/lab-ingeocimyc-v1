/**
 * * Angular
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NgChartsModule } from 'ng2-charts';

/**
 * * Routing
*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/**
 * * Material
*/
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar'
/**
 * * Components
*/
import { LayoutComponent } from './components/atom/layout/layout.component';
import { NavbarComponent } from './components/atom/navbar/navbar.component';

/**
 * * Forms
*/
import { FormCreateProjectComponent } from './components/forms/form-create-project/form-create-project.component';
import { FormCreateSolicitanteComponent } from './components/forms/form-create-solicitante/form-create-solicitante.component';

/**
 * * Lists
*/
import { ListProjectsComponent } from './components/lists/list-projects/list-projects.component';
import { ListSolicitantesComponent } from './components/lists/list-solicitantes/list-solicitantes.component';
import { ListUsersComponent } from './components/lists/list-users/list-users.component';

/**
 * * Pages
*/
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateSolicitanteComponent } from './pages/create-solicitante/create-solicitante.component';
import { HeaderComponent } from './components/ensayos/header/header.component';
import { EnsayoGranulometriaComponent } from './components/ensayos/ensayo-granulometria/ensayo-granulometria.component';
import { EnsayoPlasticoComponent } from './components/ensayos/ensayo-plastico/ensayo-plastico.component';
import { EnsayoLiquidoComponent } from './components/ensayos/ensayo-liquido/ensayo-liquido.component';
import { EnsayoHumedadComponent } from './components/ensayos/ensayo-humedad/ensayo-humedad.component';
import { EnsayoComponent } from './pages/ensayo/ensayo.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    CreateProjectComponent,
    FormCreateProjectComponent,
    FormCreateSolicitanteComponent,
    CreateSolicitanteComponent,
    ListProjectsComponent,
    ListSolicitantesComponent,
    ListUsersComponent,
    HeaderComponent,
    EnsayoGranulometriaComponent,
    EnsayoPlasticoComponent,
    EnsayoLiquidoComponent,
    EnsayoHumedadComponent,
    EnsayoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
