import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/Models/plat';

import { PlatService } from 'src/app/services/plat.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-plat',
  templateUrl: './ajout-plat.page.html',
  styleUrls: ['./ajout-plat.page.scss'],
})
export class AjoutPlatPage implements OnInit {
  plat: Plat;
  plats: Plat[];
  getPlats(): void {
    this.service.getAll().subscribe(Response => {
      this.plats = Response;
    });
  }
  constructor(private service: PlatService, public toastController: ToastController, private route: Router) {
    this.plat = new Plat();
    this.getPlats();
  }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
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
      position: 'bottom'
    });
    toast.present();
  }

  ajouterPlat(): void {
    if (this.plat.nom != undefined && this.plat.prix != undefined && this.plat.nom.length >= 3) {
      this.service.add(this.plat).subscribe(plat => {
        this.presentToast("Plat ajouté avec succés...");

        this.route.navigate(['/tabs/menu']);

      }, error => { });
    }
    else {
      this.presenttToast("Plat non ajouté...");
    }

  }
}
