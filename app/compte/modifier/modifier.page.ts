import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Utilsateur } from 'src/app/Models/Utilsateur';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {
  usernameControl: FormControl;
  prenomControl: FormControl;
  emailControl: FormControl;
  telephoneControl: FormControl;
  adresseControl: FormControl;
  formGroup: FormGroup;
  userId: number;
  nav: NavController;
  user: Utilsateur;

  constructor(private builder: FormBuilder, private routee: Router, private service: AuthService, private route: ActivatedRoute) {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(this.userId).subscribe(user => {
      this.user = user;
      this.usernameControl = new FormControl(this.user.username, [Validators.required, Validators.minLength(3)]);
      this.emailControl = new FormControl(this.user.email);
      this.prenomControl = new FormControl(this.user.prenom);
      this.adresseControl = new FormControl(this.user.adresse);
      this.telephoneControl = new FormControl(this.user.telephone);
      this.formGroup = this.builder.group({
        username: this.usernameControl,
        email: this.emailControl,
        prenom: this.prenomControl,
        adresse: this.adresseControl,
        telephone: this.telephoneControl
      })
    })
  }

  modifier(): void {
    this.service.update(this.user.id, this.formGroup.value).subscribe(user => {
      this.routee.navigate(['/tabs/compte']);
    })
  }
  doRefresh(event) {
    let userl: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let iden = userl.id;
    this.service.get(iden).subscribe(Response => {

    });

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  ngOnInit() {
  }

}
