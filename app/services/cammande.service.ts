import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../Models/commande';
import { Observable } from 'rxjs';
import { Utilsateur } from '../Models/Utilsateur';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CammandeService {
  urll: string = SERVER_URL_BE + '/commandes';

  constructor(private http: HttpClient) { }
  postCommande(commande: Commande) {

  }
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(SERVER_URL_BE + '/commandes/').pipe();
  }
  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(SERVER_URL_BE + '/commandes/' + id).pipe();
  }
  deleteCommande(id: number) {
    return this.http.delete(SERVER_URL_BE + '/commandes/' + id).pipe();
  }
  updateCommande(id: number, commade: Commande): Observable<Commande> {
    return this.http.put<Commande>(SERVER_URL_BE + '/commandes/' + id, commade).pipe();
  }
}
