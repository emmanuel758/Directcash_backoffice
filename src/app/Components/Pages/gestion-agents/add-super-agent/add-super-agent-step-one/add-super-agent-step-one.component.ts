import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/modal/merchant';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-super-agent-step-one',
  templateUrl: './add-super-agent-step-one.component.html',
  styleUrls: ['./add-super-agent-step-one.component.css']
})
export class AddSuperAgentStepOneComponent implements OnInit {

  merchants: any[] = [];
  myForm!: FormGroup;
  myForm1!: FormGroup;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  // variable de requete
  request!: Subscription;

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // variable pour griser le bouton de connexion
  isLoading = false;
  connexion_class = 'primary-light-button';

  // texte de retour ou d'annulation de requete
  textRetourConnexion = "Valider";

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public agentservice: AgentServiceService,
    public merchantService: SuperAgentService,
    private globalService: GloabalServiceService) { }

  /**
   * Ajouter un super agent
   */
  add_super_agent() {

    // on grise le bouton de connexion
    this.isLoading = true;
    this.connexion_class = '';

    // le texte retour devient "Annuler"
    this.textRetourConnexion = "Annuler";

    //
    let data: any = {
      "nom": this.myForm.value.nom,
      "email": this.myForm1.value.email,
      "contactName": this.myForm1.value.contactName,
      "phone": this.myForm.value.phone,
      "cni": this.myForm.value.cni,
      "superMerchant": `${this.myForm1.value.superMerchant}`,
      "imei": this.myForm.value.imei,
      "id": "",
      "adminId": `${this.myForm1.value.superMerchant}`,
      "contribuable": this.myForm1.value.contribuable,
      "OperateurMarketing": this.myForm1.value.OperateurMarketing,
      "region": this.myForm.value.region,
      "phoneContact": this.myForm1.value.phoneContact,
      "cniContact": this.myForm1.value.cniContact,
      "creerPar": localStorage.getItem('id'),
      "creerLe": "",
      "EmergencyContact": this.myForm1.value.phoneContact,
      "EmergencyCni": this.myForm1.value.cniContact,

    };

    // on recupere les donnee du formulaire
    console.log(data);

    // on active la barre de progression
    this.isProgressHidden = false;

    try {
      // on envoi la requete
      this.request = this.merchantService.create(data).subscribe(res => {

        // le texte retour devient "Valider"
        this.textRetourConnexion = "Valider";

        this.isLoading = false;
        this.connexion_class = 'primary-light-button';

        // on masque la barre de progression
        this.isProgressHidden = true;

        // on affiche la reponse
        console.log(res);

        // on affiche une notification
        let snackbar = this._snackBar.open("Opération effectuée avec succès.", "Ok");
        snackbar.onAction().subscribe(s => {
          snackbar.dismiss();
        })

        // et on retourne a la page de liste
        this._router.navigateByUrl("/gestion-agents/super-agents");

      }, ((err) => {

        // on affiche les erreurs dans la console
        console.log(err.error.errors);

        // on masque la barre de progression
        this.isProgressHidden = true;

        // on annule la requete
        this.request.unsubscribe();

        // et on affiche un message d'alerte
        let snackbar = this._snackBar.open("Une erreur es survenue.", "Ok");
        snackbar.onAction().subscribe(s => {
          snackbar.dismiss();
        })

      }))

      // temps de reponse max: 10s | Si apres 10s,il y'a aucune reponse...
      // setTimeout(() => {

      //   // si la requete est toujours entrain de recevoir les donnees...
      //   if (!request.closed) {
      //     // on masque la barre de progression
      //     this.isProgressHidden = true;

      //     // on annule la requete
      //     request.unsubscribe();

      //     // et on affiche un message d'alerte
      //     let snackbar = this._snackBar.open("Le serveur a mis trop de temps à repondre.", "Ok");
      //     snackbar.onAction().subscribe(s => {
      //       snackbar.dismiss();
      //     })
      //   }

      // }, this.globalService.timeout_time);
    } catch (error) {

      // le texte retour devient "Valider"
      this.textRetourConnexion = "Valider";

      // si une erreur survient
      // on affiche un message d'alerte
      let snackbar = this._snackBar.open("Une erreur est survenue.", "Ok");
      snackbar.onAction().subscribe(s => {
        snackbar.dismiss();
      })
    }


    // this._router.navigateByUrl("/gestion-agents/super-agents");
  }

  /**
   * Annuler la requete d'ajout
   */
  cancel_request() {
    if (this.isLoading) {
      this.request.unsubscribe();
      this.isLoading = false;
      this.connexion_class = 'primary-light-button';

      // le texte retour devient "Valider"
      this.textRetourConnexion = "Valider";

      // on masque la barre de progression
      this.isProgressHidden = true;
    }
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: new FormControl('', Validators.required),


      phone: new FormControl('', Validators.required),
      cni: new FormControl('', Validators.required),

      imei: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
    });
    this.myForm1 = new FormGroup({

      email: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      superMerchant: new FormControl('', Validators.required),
      contribuable: new FormControl('', Validators.required),
      OperateurMarketing: new FormControl('', Validators.required),
      phoneContact: new FormControl('', Validators.required),
      cniContact: new FormControl('', Validators.required),
    });

    this.agentservice.Agents("Merchants").subscribe(merchants => {
      this.merchants = merchants.data;
      console.log(this.merchants);
    });
  }
}
