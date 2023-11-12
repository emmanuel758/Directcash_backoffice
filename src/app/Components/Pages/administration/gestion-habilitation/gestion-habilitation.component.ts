import { Component, ViewChild, OnInit } from '@angular/core';
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
export class GestionHabilitationComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Habilitation[] = [
  ];
  dataSource!: MatTableDataSource<Habilitation, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public habilition: HabilitationService, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

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

  /**
   * Modal de gestion d'une habilitation
   * Add - Edit - Show
   */
  open_habilitation_modal(mode: string, data: any) {
    const habilitation_dialog = this.dialog.open(HabilitationDialogComponent, {
      data: {
        mode: mode,
        element: data
      }
    });

    habilitation_dialog.afterClosed().subscribe(result => {

      console.log(result);

      if (result != false) {
        let data: any = result;

        console.log('====================================');
        console.log(data);
        console.log('====================================');

        // test sur les valeur vides
        if (data.description == '' || data.pass == '' || data.label == '') {
          this.alert_message = "Tous les champs marqués (*) sont obligatoires";
          this.alert_type = "warning";
          this.closeAlert();
          this.openAlert();
        } else {

          let user = JSON.parse(JSON.stringify(localStorage.getItem("user")));

          // if (data.pass == user.password) {
          // on active la barre de progression
          this.isProgressHidden = false;

          try {
            // on envoi la requete
            let request = this.habilition.newEdit(data).subscribe(res => {

              // on stope la barre de progression
              this.isProgressHidden = true;

              // si le code est egale a 0 alors tout s'est bien passe
              console.log(res);

              // on definit le type d'alerte a  afficher en fonction du code de retour
              let res_code = res.code;
              switch (+res_code) {
                case 400:
                  this.alert_type = 'warning';
                  break;
                case 200:
                  this.alert_type = 'success';
                  break;
                case 500:
                  this.alert_type = 'danger';
                  break;
                default:
                  this.alert_type = 'info';
                  break;
              }
              this.alert_message = res.data;
              this.closeAlert();
              this.openAlert();
            });

          } catch (error) {
            // on descative la barre de progression
            this.isProgressHidden = true;

            // on notifie
            const snackbar = this._snackBar.open("Une erreur est survenue: " + error, "Ok");
            snackbar.onAction().subscribe(s => { snackbar.dismiss(); })
          }
          // } else {
          //   // on notifie
          //   const snackbar = this._snackBar.open("Mot de passe incorrect", "Ok");
          //   snackbar.onAction().subscribe(s => { snackbar.dismiss(); })
          // }
        }
      }

    });

  }

  /**
   * Supprimer un habilitation
   * @param intitule
   */
  supprimer_habilitation(intitule: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Habilitation : " + intitule,
        message: "Voulez - vous vraiment supprimer cette habilitation ? \nLes comptes conernés n'auront plus d'habilitation"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   *
   */
  show_information() {
    // const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
    //   data: {}
    // });

    // show_info_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  /**
   * Au chargement de la page
   */
  ngOnInit(): void {
    this.habilition.habilitations().subscribe(habi => {

      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.displayedColumns = ['Intitulé', 'Crée par', 'Crée le', 'Statut', 'Actions'];

    this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];

    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);

  }

}


