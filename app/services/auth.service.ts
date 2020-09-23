import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilsateur } from "../Models/Utilsateur";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router, CanActivate } from '@angular/router';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  username: string;
  getUsers() {
    throw new Error("Method not implemented.");
  }
  update(id: number, user: Utilsateur): Observable<Utilsateur> {
    return this.http.put<Utilsateur>(SERVER_URL_BE + '/users/' + id, user).pipe();
  }

  get(id: number): Observable<Utilsateur> {
    return this.http.get<Utilsateur>(SERVER_URL_BE + '/users/' + id).pipe();
  }

  getAll(): Observable<Utilsateur[]> {
    return this.http.get<Utilsateur[]>(SERVER_URL_BE + '/users/').pipe();
  }
  redirectUrl: string = SERVER_URL_FE + '/login';
  urll: string = SERVER_URL_BE + '/users';
  constructor(private http: HttpClient, private route: Router, public toastController: ToastController) { }
  // canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
  //   throw new Error("Method not implemented.");
  //   let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
  // }
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
  canActivate(): any {
    let user: Utilsateur = JSON.parse(localStorage.getItem('token')) as Utilsateur;
    let res = false;
    if (user.role.name == 'Administrateur') {
      res = true;
    }
    if (res !== true) {
      this.presenttToast("Vous n'ete pas Autoriser");
    }
    return res;

  }


  login(email: string, password: string) {
    // console.log(email, password);

    this.urll += "?email=" + email + "&secret=" + password;
    console.log(this.urll);
    return this.http.get(this.urll).subscribe(res => {
      let user: {};
      console.log(res[0]);
      if (res[0] != undefined) {
        user = res[0];
        localStorage.setItem('token', JSON.stringify(user));
        this.presentToast("Bienvenue");
        this.urll = SERVER_URL_BE + '/users';
        this.route.navigate(['/tabs/accueil']);
      } else {
        this.urll = SERVER_URL_BE + "/users";
        this.presenttToast("    Erreur d'authentification");

      }
    });
  }

  register(user: Utilsateur) {
    return this.http.post(SERVER_URL_BE + '/users', user).pipe();
  }


}
