import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router, CanActivate } from '@angular/router';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilsateur } from 'src/app/Models/Utilsateur';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  url: string = SERVER_URL_BE + '/users';
  loginForm: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder, private alertController: AlertController, private http: HttpClient, private route: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }
  log() {
    let email = this.loginForm.value.email;
    let telephone = this.loginForm.value.telephone;
    console.log(email, telephone);
    this.resetP(email, telephone);
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Nouveau Password',
      inputs: [
        {
          name: 'password1',
          type: 'password',
          placeholder: 'Nouveau password *'
        },
        {
          name: 'password2',
          type: 'password',
          id: 'password2',
          placeholder: 'Confirmer le nouveau password *'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');

          }
        }, {
          text: 'Confirmer',
          handler: async () => {
            console.log('Confirm Ok');
            let result = await alert.onDidDismiss();
            console.log(result.data.values);
            let p1 = result.data.values.password1;
            let p2 = result.data.values.password2;
            if (p1 == '' || p2 == '') {
              this.presenttToast("Veillez remplir les champs obigatoire ( * )");
              this.presentAlertPrompt();
            } else {
              if (p1 == p2) {
                let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
                user.secret = p1;
                localStorage.clear();
                console.log(user);
                this.auth.update(user.id, user).subscribe(user => { });
                this.presentcToast("Mise a jour Reussi !")
                this.route.navigate(['/login']);

              } else {
                this.presenttToast("Mots de passe non identiques");
                this.presentAlertPrompt();
              }
            }

          }
        }
      ]
    });
    await alert.present();

  }


  resetP(email: string, telephone: number) {
    console.log(email, telephone);
    localStorage.clear();
    this.url += "?email=" + email + "&telephone=" + telephone;
    console.log(this.url);
    return this.http.get(this.url).subscribe(res => {
      let user: {};
      console.log(res[0]);
      if (res[0] != undefined) {
        user = res[0];
        localStorage.setItem('token', JSON.stringify(user));
        this.presentToast("Authentification Reussi");
        this.url = SERVER_URL_BE + '/users';
        this.presentAlertPrompt();
      } else {
        this.url = SERVER_URL_BE + "/users";
        this.presenttToast("    Erreur d'authentification");

      }
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async presenttToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  async presentcToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}
