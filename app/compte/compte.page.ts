import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilsateur } from '../Models/Utilsateur';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource, PhotosAlbumType } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';

declare var ext;
@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage implements OnInit {
  imagee: SafeResourceUrl;
  users: Utilsateur[];
  imagePath: string;
  upload: any;
  id: number;
  username: any;
  email: any;
  password: any;
  image: any;
  prenom: any;
  adresse: any;
  telephone: number;
  utils: any;

  constructor(
    private auth: AuthService,
    private camera: Camera,
    private route: Router,
    private domSanitizer: DomSanitizer,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public actionSheetController: ActionSheetController,
  ) {
    this.doRefresh;
  }



  doRefresh(event) {
    let userl: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let iden = userl.id;
    this.auth.get(iden).subscribe(Response => {
      this.username = Response.username;
      this.prenom = Response.prenom;
      this.adresse = Response.adresse
      this.email = Response.email;
      this.password = Response.secret;
      this.utils = Response;

    });

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  ModifierUser(): void {
    let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let idd = user.id;
    setInterval(() => {
      this.auth.get(idd);
    }, 100);
    this.route.navigateByUrl("/tabs/compte/modifier/" + idd);
  }
  logout() {
    (localStorage.removeItem('token'));
    (localStorage.clear());
  }
  ngOnInit() {
    let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.secret;
    this.prenom = user.prenom;
    this.adresse = user.adresse;
    this.telephone = user.telephone;
    this.image = SERVER_URL_BE + user.image[0].url;

  }

  async openCam() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

  }

  cext() {
    ext();
  }





}
