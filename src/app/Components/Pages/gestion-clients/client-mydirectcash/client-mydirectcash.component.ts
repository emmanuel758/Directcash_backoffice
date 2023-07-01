import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientDialogComponent } from 'src/app/Components/Modals/add-client-dialog/add-client-dialog.component';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-client-mydirectcash',
  templateUrl: './client-mydirectcash.component.html',
  styleUrls: ['./client-mydirectcash.component.css']
})
export class ClientMydirectcashComponent {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;

  displayedColumns: string[] = ['Nom', 'Matricule', 'Téléphone', 'Statut', 'Adresse', 'Actions'];
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
      data: { selected_value: this.selected_value, title: "des clients MyDirectCash" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_client_dialog(mode: string) {
    const add_client_dialog = this.dialog.open(AddClientDialogComponent, {
      data: {
        nom: '',
        solde: '',
        adresse: '',
        statut: '',
        tel: '',
        email: '',
        sexe: '',
        matricule: '',
        mode: mode
      }
    });

    add_client_dialog.afterClosed().subscribe(result => {
      this.add_agent_form = result;
      console.log(this.add_agent_form.value);
    });
  }

  open_block_client_dialog(object: string) {
    const block_client_dialog = this.dialog.open(BlockAccountDialogComponent, {
      data:{
        object: object
      }
    });

    block_client_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  open_snackbar(client: string) {
    this.snackbar_message = "Le mot de passe du client " + client + " a été rénitialisé à 0000";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

}

export interface PeriodicElement {
  nom: string;
  matricule: string;
  tel: string;
  statut: string;
  adresse: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nom: "Emmanuel", matricule: "14GDF2", tel: '670630558', statut: 'Actif', adresse: 'Adresse' },];