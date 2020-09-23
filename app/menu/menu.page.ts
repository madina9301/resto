import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plat } from '../Models/plat';
import { PlatService } from '../services/plat.service';
import { Utilsateur } from '../Models/Utilsateur';
import { CammandeService } from '../services/cammande.service';
import { Commande } from '../Models/commande';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';



@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage {
  plats: Plat[];

  getPlats(): void {
    this.service.getAll().subscribe(Response => {
      this.plats = Response;
    });
  }

  constructor(private router: Router,
    private service: PlatService,
    private Cservice: CammandeService,
    private http: HttpClient,
    private ac: AlertController,
    public toastController: ToastController) {
    this.getPlats();
  }

  ModifierPlat(id: number): void {

    this.router.navigateByUrl("/tabs/menu/modifier-plat/" + id);
  }
  voirPlat(id: number): void {

    this.router.navigateByUrl("/tabs/menu/voir-plat/" + id);
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
  delete(plat: Plat): void {
    let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let role = user.role.name;
    console.log(role);
    if (role != "Administrateur") {
      this.presenttToast("Vous n'ete pas Autoriser");
    } else {

      this.service.delete(plat.id).subscribe(plat => {
        this.getPlats();
      });
    }
  }

  async AlertSup(plat: Plat) {
    const alert = await this.ac.create({
      header: '       Supprimer',
      message: '<p style="text-align:center"><strong>Confirmez la Suppression ?</strong><p>',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.delete(plat);
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }



  doRefresh(event) {
    this.service.getAll().subscribe(Response => {
      this.plats = Response;
    });

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  commander(commande: Commande) {
    let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let platj = commande.nom;
    console.log(platj);
    let prixj = commande.prix;
    let usernamej = user.username;
    let telephonej = user.telephone;
    let adressej = user.adresse;
    let obj = { username: usernamej, plat: platj, telephone: telephonej, adresse: adressej, prix: prixj };
    let myJSON = JSON.stringify(obj);
    console.log(myJSON);

    return this.http.post(SERVER_URL_BE + '/commandes', myJSON).subscribe(res => { });
  }

  async AlertConfirm(commande: Commande) {
    const alert = await this.ac.create({
      header: '       Commande',
      message: '<p style="text-align:center"><strong>Confirmez la commande ?</strong><p>',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.commander(commande);
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }


}