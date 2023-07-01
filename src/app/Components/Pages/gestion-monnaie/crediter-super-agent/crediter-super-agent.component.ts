import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApprovisionnerAgenceDialogComponent } from 'src/app/Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-crediter-super-agent',
  templateUrl: './crediter-super-agent.component.html',
  styleUrls: ['./crediter-super-agent.component.css']
})
export class CrediterSuperAgentComponent {

  constructor(public dialog: MatDialog, private router: Router) { }


  displayedColumns: string[] = ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: '', title: "des approvisionnements" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_appr_agence_dialog() {
    const appr_agence_dialog = this.dialog.open(ApprovisionnerAgenceDialogComponent, {
      data: {
        object: 'super-agent'
      }
    });

    appr_agence_dialog.afterClosed().subscribe(result => {

      if(result==true){
        this.router.navigateByUrl("gestion-monnaie/approvisionner-agence/valider-approvisionnement");
      }
      console.log(result);
    });
  }
}

export interface PeriodicElement {
  super_agent: string;
  montant: number;
  statut: string;
  created_by: string;
  created_at: string;
  treated_by: string;
  treated_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { super_agent: "Emmanuel", montant: 40, statut: 'En cours', created_by: 'Jojo', created_at: '14/10/2010 15:30', treated_by:"Emmanuel leuna", treated_at:'14/01/2023 14:02' },];
