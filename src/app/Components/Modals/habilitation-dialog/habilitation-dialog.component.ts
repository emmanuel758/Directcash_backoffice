import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-habilitation-dialog',
  templateUrl: './habilitation-dialog.component.html',
  styleUrls: ['./habilitation-dialog.component.css']
})
export class HabilitationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  mode = this.data.mode;
}
