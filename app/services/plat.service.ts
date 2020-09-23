import { Injectable } from '@angular/core';
import { Plat } from '../Models/plat';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL_BE, SERVER_URL_FE } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlatService {

  getPlats() {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient, ) { }

  add(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(SERVER_URL_BE + '/plats/', plat).pipe();
  }

  delete(id: number): Observable<Plat> {
    return this.http.delete<Plat>(SERVER_URL_BE + '/plats/' + id).pipe();
  }

  update(id: number, plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(SERVER_URL_BE + '/plats/' + id, plat).pipe();
  }

  get(id: number): Observable<Plat> {
    return this.http.get<Plat>(SERVER_URL_BE + '/plats/' + id).pipe();
  }

  getAll(): Observable<Plat[]> {
    return this.http.get<Plat[]>(SERVER_URL_BE + '/plats/').pipe();
  }
}
