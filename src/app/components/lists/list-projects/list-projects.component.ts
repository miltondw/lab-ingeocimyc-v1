import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProject, IProjectData } from '@app/models/Project.model'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.sass']
})
export class ListProjectsComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'location', 'reference', 'probes', 'user_id', 'solicitante_id','date'];
  itemsList = [['title', 'Titulo'], ['location', 'Ubicación'], ['reference', 'Referencia'], ['probes', 'Sondeos'], ['user_id', 'Usuario'], ['solicitante_id', 'Solicitante'],['date','Fecha']]
  projects: IProjectData[] = [];
  dataSource: MatTableDataSource<IProjectData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25,100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getData(e.pageIndex,e.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor (private projectService: ProjectService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.getData()
  }

  getData(pageNumber?: number,elements?: number) {
    this.projectService.get(pageNumber,elements).subscribe({
      next: (data: IProject) => {
        this.projects = data.content;
        this.dataSource = new MatTableDataSource(data.content);
        this.length = data.totalElements;
        this.pageIndex = data.pageable.pageNumber;
        if(this.length>100)this.pageSizeOptions.push(this.length)
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
