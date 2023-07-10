import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { HabilitationDialogComponent } from 'src/app/Components/Modals/habilitation-dialog/habilitation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { HabilitationService } from '../../../../services/habilitation/habilitation.service';

@Component({
  selector: 'app-gestion-habilitation',
  templateUrl: './gestion-habilitation.component.html',
  styleUrls: ['./gestion-habilitation.component.css']
})
export class GestionHabilitationComponent implements OnInit  {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Habilitation[] = [
];
dataSource!:MatTableDataSource<Habilitation, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public habilition:HabilitationService, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editer_habilitation(mode: string) {
   const habilitation_dialog = this.dialog.open(HabilitationDialogComponent, {
      data: {
        mode: mode
      }
    });

    habilitation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });

  }


  supprimer_habilitation(intitule: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Habilitation : "+ intitule,
        message: "Voulez - vous vraiment supprimer cette habilitation ? \nLes comptes conernés n'auront plus d'habilitation"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  show_information() {
    // const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
    //   data: {}
    // });

    // show_info_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }
  ngOnInit(): void {
    this.habilition.habilitations().subscribe(habi=>{
      
      this.ELEMENT_DATA=habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns= ['Intitulé', 'Crée par', 'Crée le', 'Statut', 'Actions'];
      this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
    
    });
    this.displayedColumns= ['Intitulé', 'Crée par', 'Crée le', 'Statut', 'Actions'];
    this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
  
  }

}

