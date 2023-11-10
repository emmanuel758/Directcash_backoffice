import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Agent } from 'src/app/modal/agent';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';

@Component({
  selector: 'app-distributeur',
  templateUrl: './distributeur.component.html',
  styleUrls: ['./distributeur.component.css']
})
export class DistributeurComponent implements OnInit {

  displayedColumns: string[] = [];
  ELEMENT_DATA: Agent[] = [
  ];
  dataSource!: MatTableDataSource<Agent, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private router: Router, public AgentService: AgentServiceService, private _snackBar: MatSnackBar) {

  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /**
     * Fonction pour le filtre dynamique a un champs sur le tableau
     * @param event
     */
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Fermeture de l'alerte
   */
  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  /**
   * Ouverture de l'alerte
   */
  openAlert() {
    this.closeAlert();
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des Distributeurs" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_distributeur_dialog(mode: string) {
    // const show_super_agent_dialog = this.dialog.open(ShowSuperAgengDialogComponent, {
    //   data:{
    //     mode: mode
    //   }
    // });

    // show_super_agent_dialog.afterClosed().subscribe(result => {

    // });
  }

  ngOnInit(): void {
    this.AgentService.Agents("Distributors").subscribe(distributeurs => {
      this.ELEMENT_DATA = distributeurs.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Nom', 'Solde (XAF)','banque', 'Merchant', 'N° IMEI','date' ,'Actions'];
      this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none'
    });

    this.displayedColumns = ['Nom',  'Solde (XAF)', 'banque','Merchant', 'N° IMEI','date' , 'Actions'];
    this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);
  }

}
