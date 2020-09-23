import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { Plat } from 'src/app/Models/plat';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modifier-plat',
  templateUrl: './modifier-plat.page.html',
  styleUrls: ['./modifier-plat.page.scss'],
})
export class ModifierPlatPage implements OnInit {
  nomControl: FormControl;
  prixControl: FormControl;
  descriptionControl: FormControl;
  formGroup: FormGroup;
  platId: number;
  nav: NavController;
  plat: Plat;

  constructor(private builder: FormBuilder, private routee: Router, private service: PlatService, private route: ActivatedRoute) {
    this.platId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(this.platId).subscribe(plat => {
      this.plat = plat;
      this.nomControl = new FormControl(this.plat.nom, [Validators.required, Validators.minLength(3)]);
      this.descriptionControl = new FormControl(this.plat.description);
      this.formGroup = this.builder.group({
        nom: this.nomControl,
        prix: this.prixControl,
        description: this.descriptionControl
      })
    })
  }

  modifier(): void {
    this.service.update(this.plat.id, this.formGroup.value).subscribe(plat => {
      this.service.getAll();
      this.routee.navigate(['/tabs/menu']);
    })
  }

  ngOnInit() {
  }

}
