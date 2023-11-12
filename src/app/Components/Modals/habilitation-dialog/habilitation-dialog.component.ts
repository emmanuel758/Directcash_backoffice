import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabilitationService } from 'src/app/services/habilitation/habilitation.service';

@Component({
  selector: 'app-habilitation-dialog',
  templateUrl: './habilitation-dialog.component.html',
  styleUrls: ['./habilitation-dialog.component.css']
})
export class HabilitationDialogComponent {
  data: any = {
    "source": "0",
    "idhabilitation": 0,
    "label": "",
    "description": "",
    "creerPar": localStorage.getItem('id'),
    "creerLe": "",
    "pass": ""
  }
  @ViewChild("form") form!: NgForm;
  constructor(@Inject(MAT_DIALOG_DATA) public datas: any, public habilitationService: HabilitationService) {
    console.log(datas.mode);
    if (datas.mode === 'edit') {
      this.data = { ...datas.element }
      this.data.source = `${datas.element.idhabilitation}`;
      this.data.idhabilitation = datas.element.idhabilitation;
      this.data.description = datas.element.description
      this.data.label = datas.element.label;
      this.data.creerPar = datas.element.creerPar;
      this.data.creerLe = datas.element.creerLe;
    }
  }

  mode = this.datas.mode;
  valide() {
    console.log(this.data);

    // on retourne les donnes
    return this.data;

    // this.habilitationService.newEdit(this.data).subscribe(res => {
    //   console.log(res);
    // })
  }
}

