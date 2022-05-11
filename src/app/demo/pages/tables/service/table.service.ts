import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http : HttpClient) { }

  public findAll(){
    return this.http.get<Array<any>>(`${environment.urlApi}/inventory/findAll`, {observe : 'response'});
  }
}
