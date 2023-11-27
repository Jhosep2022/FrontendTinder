import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Occupation } from 'src/app/models/Ocupation';
import { ApiResponse, OccupationService } from 'src/app/services/ocupation.service';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ocupation',
  templateUrl: './ocupation.component.html',
  styleUrls: ['./ocupation.component.css']
})
export class OcupationComponent implements OnInit {
  maxSize: number = 100;
  displayedColumns: string[] = ['ocupationId', 'ocupationName'];
  dataSource = new MatTableDataSource<Occupation>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  newOccupation: Occupation = new Occupation(0, '');

  constructor(private occupationService: OccupationService, private keycloakService: KeycloakService, private router: Router) { }

  ngOnInit(): void {
      var roles = this.keycloakService.getUserRoles();
      if (!roles.includes("ADMIN")) {
            this.router.navigate(['/error']);
      }
    this.loadOccupations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadOccupations(page: number = 0, pageSize: number = 10): void {
    this.occupationService.getAllOccupations(page, pageSize)
      .subscribe(
        (response: ApiResponse) => {
          console.log('Datos recibidos para la tabla:', response.data);
          this.dataSource.data = response.data;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  createOccupation(): void {
    if (this.newOccupation.occupationName) {
      this.occupationService.createOccupation(this.newOccupation)
        .subscribe(
          occupation => {
            console.log('Ocupación creada:', occupation);
            this.dataSource.data = [...this.dataSource.data, occupation];
            this.newOccupation = new Occupation(0, '');
          },
          error => {
            console.error('Error al crear la ocupación:', error);
          }
        );
    }
  }


  pageChangeEvent(event: any): void {
    this.loadOccupations(event.pageIndex, event.pageSize);
  }
}
